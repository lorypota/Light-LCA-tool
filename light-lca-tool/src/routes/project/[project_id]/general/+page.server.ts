import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjectByID, updateProjectByID } from '$lib/db/projects';
import type { Project, ProjectAreaOfProduction, ProjectStatus } from '$lib/interfaces';

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
		if (!project_id) {
			return fail(400, {
				error: true,
				message: 'Project ID not provided'
			});
		}
		const data = await request.formData();

		const name = data.get('name') as string;
		const owner = data.get('owner') as string;
		const creationDate = data.get('creationDate') as string;
		const areaOfProduction = data.get('areaOfProduction') as ProjectAreaOfProduction;
		const projectStatus = data.get('projectStatus') as ProjectStatus;

		const project = {
			name: name,
			owner: owner,
			creationDate: creationDate,
			areaOfProduction: areaOfProduction,
			status: projectStatus
		} as Partial<Project>;

		await updateProjectByID(project_id, project);
		return { success: true, message: 'Project updated' };
	}
} satisfies Actions;
