import { countProjects, getProjectsArray } from '$lib/db/projects';
import type { PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;
	const searchString = url.searchParams.get('search') as string;
	const filter = url.searchParams.get('filter') as string;

	let numProjects: number = await countProjects(filter, searchString);

	if (numProjects === 0) {
		error(404, { message: 'No project found' });
	}

	if (skip > numProjects || limit < 1 || skip < 0) {
		error(400, { message: 'Bad request' });
	}

	const loadProjects = async () => {
		return await getProjectsArray(filter, searchString, limit, skip);
	};

	return { projectInfos: loadProjects(), totalProjects: numProjects };
};
