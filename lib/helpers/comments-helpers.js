"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideInputObjectTypesAndRelatedFields = exports.resolveModelsComments = void 0;
const modelAttributeRegex = /(@@Gen\.)+([A-z])+(\()+(.+)+(\))+/;
const attributeNameRegex = /(?:\.)+([A-Za-z])+(?:\()+/;
const attributeArgsRegex = /(?:\()+([A-Za-z])+\:+(.+)+(?:\))+/;
function resolveModelsComments(models, modelOperations, enumTypes, hiddenModels, hiddenFields) {
    models = collectHiddenModels(models, hiddenModels);
    collectHiddenFields(models, hiddenModels, hiddenFields);
    hideModelOperations(models, modelOperations);
    hideEnums(enumTypes, hiddenModels);
}
exports.resolveModelsComments = resolveModelsComments;
function collectHiddenModels(models, hiddenModels) {
    return models
        .map((model) => {
        if (model.documentation) {
            const attribute = model.documentation?.match(modelAttributeRegex)?.[0];
            const attributeName = attribute
                ?.match(attributeNameRegex)?.[0]
                ?.slice(1, -1);
            if (attributeName !== 'model')
                model;
            const rawAttributeArgs = attribute
                ?.match(attributeArgsRegex)?.[0]
                ?.slice(1, -1);
            const parsedAttributeArgs = {};
            if (rawAttributeArgs) {
                const rawAttributeArgsParts = rawAttributeArgs
                    .split(':')
                    .map((it) => it.trim())
                    .map((part) => (part.startsWith('[') ? part : part.split(',')))
                    .flat()
                    .map((it) => it.trim());
                for (let i = 0; i < rawAttributeArgsParts.length; i += 2) {
                    const key = rawAttributeArgsParts[i];
                    const value = rawAttributeArgsParts[i + 1];
                    parsedAttributeArgs[key] = JSON.parse(value);
                }
            }
            if (parsedAttributeArgs.hide) {
                hiddenModels.push(model.name);
                return null;
            }
        }
        return model;
    })
        .filter(Boolean);
}
function collectHiddenFields(models, hiddenModels, hiddenFields) {
    models.forEach((model) => {
        model.fields.forEach((field) => {
            if (hiddenModels.includes(field.type)) {
                hiddenFields.push(field.name);
                if (field.relationFromFields) {
                    field.relationFromFields.forEach((item) => hiddenFields.push(item));
                }
            }
        });
    });
}
function hideEnums(enumTypes, hiddenModels) {
    enumTypes.prisma = enumTypes.prisma.filter((item) => !hiddenModels.find((model) => item.name.startsWith(model)));
}
function hideModelOperations(models, modelOperations) {
    let i = modelOperations.length;
    while (i >= 0) {
        --i;
        const modelOperation = modelOperations[i];
        if (modelOperation &&
            !models.find((model) => {
                return model.name === modelOperation.model;
            })) {
            modelOperations.splice(i, 1);
        }
    }
}
function hideInputObjectTypesAndRelatedFields(inputObjectTypes, hiddenModels, hiddenFields) {
    let j = inputObjectTypes.length;
    while (j >= 0) {
        --j;
        const inputType = inputObjectTypes[j];
        if (inputType &&
            (hiddenModels.includes(inputType?.meta?.source) ||
                hiddenModels.find((model) => inputType.name.startsWith(model)))) {
            inputObjectTypes.splice(j, 1);
        }
        else {
            let k = inputType?.fields?.length ?? 0;
            while (k >= 0) {
                --k;
                const field = inputType?.fields?.[k];
                if (field && hiddenFields.includes(field.name)) {
                    inputObjectTypes[j].fields.splice(k, 1);
                }
            }
        }
    }
}
exports.hideInputObjectTypesAndRelatedFields = hideInputObjectTypesAndRelatedFields;
//# sourceMappingURL=comments-helpers.js.map