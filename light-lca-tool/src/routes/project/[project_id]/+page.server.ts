import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjectByID } from '$lib/db/projects';

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProjectByID(params.project_id);
	if (project) {
		return { project };
	}
	error(404, 'Not found');
};
