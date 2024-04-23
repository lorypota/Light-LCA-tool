import { countProjects, getProjectsArray } from '$lib/db/projects';
import { tableMapperValues } from '@skeletonlabs/skeleton';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const loadProjects = async () => {
		return await getProjectsArray();
	};
	return { projectInfos: loadProjects(), totalProjects: await countProjects() };
};
