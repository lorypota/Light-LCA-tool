import { PROJECTS_COLLECTION } from '$lib/const';
import { functionMongoWrapper } from '$lib/db/mongo';
import { createNewProject } from '$lib/db/projects';
import { ProjectStatus, type Project, type ProjectAreaOfProduction } from '$lib/interfaces';
import { error, fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name') as string;
		const owner = data.get('owner') as string;
		const areaOfProduction = data.get('areaOfProduction') as ProjectAreaOfProduction;

		const project = {
			name: name,
			owner: owner,
			areaOfProduction: areaOfProduction
		} as Partial<Project>;

		await functionMongoWrapper(PROJECTS_COLLECTION, createNewProject, project);
		return { success: true, message: 'Project updated' };
	}
} satisfies Actions;
