"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOptionalToRequiredFields = void 0;
function changeOptionalToRequiredFields(inputObjectTypes) {
    inputObjectTypes.map((item) => {
        if (item.name.includes('WhereUniqueInput') &&
            item.constraints.fields?.length > 0) {
            item.fields = item.fields.map((subItem) => {
                if (item.constraints.fields?.includes(subItem.name)) {
                    subItem.isRequired = true;
                    return subItem;
                }
                return subItem;
            });
        }
        return item;
    });
}
exports.changeOptionalToRequiredFields = changeOptionalToRequiredFields;
//# sourceMappingURL=whereUniqueInput-helpers.js.map