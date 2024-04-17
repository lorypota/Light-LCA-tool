import { projects } from '$db/projects';
import type { PageServerLoad } from './$types';

type ProjectDictionary = {
	[key: string]: string;
};

type LoadReturnType = {
	projects: ProjectDictionary;
};

export const load: PageServerLoad = async function (): Promise<LoadReturnType> {
	const projectNames = await projects
		.find(
			{},
			{
				limit: 50,
				projection: {
					name: 1
				}
			}
		)
		.toArray();

	const projectDictionary: ProjectDictionary = projectNames.reduce(
		(dict: ProjectDictionary, item: any) => {
			dict[item._id.toString()] = item.name;
			return dict;
		},
		{}
	);

	return {
		projects: projectDictionary
	};
};
