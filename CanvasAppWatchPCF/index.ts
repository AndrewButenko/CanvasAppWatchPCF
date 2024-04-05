import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { WatchComponent, IWatchComponentProps } from "./Components/WatchComponent";

export class CanvasAppWatchPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IWatchComponentProps = { 
            value: context.parameters.Observables.raw
        };
        return React.createElement(
            WatchComponent, props
        );
    }

    public getOutputs(): IOutputs {
        return { };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
