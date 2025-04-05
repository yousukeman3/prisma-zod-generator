import { ConnectorType, DMMF } from '@prisma/generator-helper';
import { Dictionary } from '@prisma/internals';
import { MutableDeep } from '../types';
interface AddMissingInputObjectTypeOptions {
    isGenerateSelect: boolean;
    isGenerateInclude: boolean;
}
export declare function addMissingInputObjectTypes(inputObjectTypes: MutableDeep<DMMF.InputType[]>, outputObjectTypes: DMMF.OutputType[], models: DMMF.Model[], modelOperations: DMMF.ModelMapping[], dataSourceProvider: ConnectorType, options: AddMissingInputObjectTypeOptions): void;
export declare function resolveAddMissingInputObjectTypeOptions(generatorConfigOptions: Dictionary<string>): AddMissingInputObjectTypeOptions;
export {};
