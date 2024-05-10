/*import type { UUID } from 'mongodb';

const ProjectSchema = {
	name: 'Project',
	properties: {
		_id: 'uuid',
		name: 'string',
		owner: 'string',
		creationDate: 'date',
		status: 'string',
		areaOfProduction: 'string',
		efficiency: 'int',
		useEnergyMix: 'int',
		electricityUse: 'int'
	},
	primaryKey: '_id'
};

class Project extends Object<Project> {
	_id!: UUID; //Maybe change to ObjectId ??
	name!: string;
	owner!: string;
	creationDate!: Date;
	status!: string;
	areaOfProduction!: string;
	efficiency?: number;
	useEnergyMix?: number;
	electricityUse?: number;

	static schema: ObjectSchema = ProjectSchema;
}

const realm = await Realm.open({
	schema: [ProjectSchema]
});
*/
