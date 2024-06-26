import { countProjects, getProjectsArray } from '$lib/db/projects';
import type { PageServerLoad } from './$types';
import { functionMongoWrapper } from '$lib/db/mongo';
import { PROJECTS_COLLECTION } from '$lib/const';
import { error } from '@sveltejs/kit';
import { serializeProjects } from '$lib/utils';

export const load: PageServerLoad = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;
	const searchString = url.searchParams.get('search') as string;
	const filter = url.searchParams.get('filter') as string;

	try {
		const totalProjects: number = await functionMongoWrapper(PROJECTS_COLLECTION, countProjects, {
			filter,
			searchString
		});

		if (skip > totalProjects || limit < 1 || skip < 0) {
			error(400, { message: 'Bad request' });
		}

		let projectInfos = await functionMongoWrapper(PROJECTS_COLLECTION, getProjectsArray, {
			filter,
			searchString,
			limit,
			skip
		});

		projectInfos = serializeProjects(projectInfos);

		return { projectInfos, totalProjects };
	} catch {
		error(500, 'MongoDB Error, is MongoDB running?');
	}
};
