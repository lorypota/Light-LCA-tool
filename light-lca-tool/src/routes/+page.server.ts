import { countProjects, getProjectsArray } from '$lib/db/projects';
import type { PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;

	let totalProjects: number = await countProjects();

	if (limit > totalProjects || skip > totalProjects || limit < 1 || skip < 0) {
		error(400, { message: 'Bad request' });
	}

	const loadProjects = async () => {
		return await getProjectsArray(limit, skip);
	};

	return { projectInfos: loadProjects(), totalProjects: totalProjects };
};
