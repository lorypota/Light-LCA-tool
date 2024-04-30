import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjectByID, updateProjectByID } from '$lib/db/projects';
import type { Project, ProjectStatus } from '$lib/interfaces';

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProjectByID(params.project_id);
	if (project) {
		return { project };
	}
	error(404, 'Not found');
};

export const actions: Actions = {
	default: async ({ params, request }) => {
		const { project_id } = params;
		console.log(project_id);
		if (!project_id) {
			return { status: 400, body: { message: 'Project ID not provided' } };
		}
		const data = await request.formData();

		const project = {
			name: data.get('name') as string,
			owner: data.get('owner') as string,
			creationDate: new Date(data.get('creationDate') as string),
			areaOfProduction: data.get('areaOfProduction') as string,
			projectStatus: data.get('projectStatus') as ProjectStatus
		} as Partial<Project>;

		await updateProjectByID(project_id, project);
		return { status: 200, body: { message: 'Project updated' } };
	}
} satisfies Actions;
