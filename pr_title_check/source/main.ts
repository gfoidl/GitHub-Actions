import * as core from '@actions/core'
//-----------------------------------------------------------------------------
async function run(): Promise<void> {
    const promise = new Promise<void>(res => {
        setTimeout(() => res(), 100);
    });

    await promise;

    const titlePattern = core.getInput("pattern");
    console.log(titlePattern);
}
//-----------------------------------------------------------------------------
run();


export function add(a: number, b: number): number {
    return a + b;
}

export const diff = (a: number, b: number): number => a - b;
