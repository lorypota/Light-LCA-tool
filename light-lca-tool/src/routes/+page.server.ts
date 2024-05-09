import { countProjects, getProjectsArray } from '$lib/db/projects';
import type { PageServerLoad } from './$types';
import { functionMongoWrapper } from '$lib/db/mongo';
import { PROJECTS_COLLECTION } from '$lib/const';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const projectInfos = await functionMongoWrapper(PROJECTS_COLLECTION, getProjectsArray);
		const totalProjects = await functionMongoWrapper(PROJECTS_COLLECTION, countProjects);
		return {
			projectInfos,
			totalProjects
		};
	} catch {
		error(500, 'MongoDB Error, is MongoDB running?');
	}
};
