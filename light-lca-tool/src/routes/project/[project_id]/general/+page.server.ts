import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjectByID, updateProjectByID } from '$lib/db/projects';
import type { Project, ProjectAreaOfProduction, ProjectStatus } from '$lib/interfaces';
import { functionMongoWrapper } from '$lib/db/mongo';
import { PROJECTS_COLLECTION } from '$lib/const';

export const load: PageServerLoad = async ({ params }) => {
	const { project_id } = params;
	if (!project_id) {
		return fail(400, {
			error: true,
			message: 'Project ID not provided'
		});
	}

	const { creationDate, ...projectWithoutDate }: Project = await functionMongoWrapper(
		PROJECTS_COLLECTION,
		getProjectByID,
		project_id
	);

	if (projectWithoutDate) {
		return {
			creationDate: creationDate ? new Date(creationDate) : null,
			projectWithoutDate
		};
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
		const creationDate = new Date(data.get('creationDate') as string);
		const areaOfProduction = data.get('areaOfProduction') as ProjectAreaOfProduction;
		const status = data.get('status') as ProjectStatus;

		const project = {
			name,
			owner,
			creationDate,
			areaOfProduction,
			status
		} as Project;

		await functionMongoWrapper(PROJECTS_COLLECTION, updateProjectByID, {
			_id: project_id,
			project
		});
		return { success: true, message: 'Project updated' };
	}
} satisfies Actions;
