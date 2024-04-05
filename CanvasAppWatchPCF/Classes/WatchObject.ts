import * as React from "react";

export class WatchObject {
    readonly key: React.ReactNode;
    readonly PropertyName: string;
    readonly TypeName: string;
    readonly DisplayName: string;
    readonly IsSimple: boolean;
    readonly children: WatchObject[];

    constructor(propertyName: string, propertyValue: any, key: string) {
        this.key = key;
        this.PropertyName = propertyName;

        if (propertyValue == undefined || propertyValue == null) {
            this.TypeName = "null/undefined";
            this.DisplayName = "";
            this.IsSimple = true;
        } else if (typeof propertyValue === "string" ||
            typeof propertyValue === "boolean" ||
            typeof propertyValue === "number") {
            this.TypeName = typeof propertyValue;
            this.IsSimple = true;
            this.DisplayName = propertyValue.toString();
        } else if (propertyValue.constructor === Date) {
            this.TypeName = "DateTime";
            this.IsSimple = true;
            this.DisplayName = propertyValue.toString();
        } else if (propertyValue.constructor === Array) {
            this.TypeName = "Array";
            this.IsSimple = false;
            this.DisplayName = "Collection";

            const childRecords = (propertyValue as Array<any>).map((a: any, i: number) => new WatchObject(`[${i}]`, a, `${key}-${i}`));

            this.children = childRecords;
        } else {
            this.TypeName = "Object";
            this.IsSimple = false;
            this.DisplayName = "Object";

            const childRecords: WatchObject[] = [];

            let i = 0;
            for(let fieldName in propertyValue) {
                childRecords.push(new WatchObject(fieldName, propertyValue[fieldName], `${key}-${i}`));
                i++;
            }

            this.children = childRecords;
        }
    }
}