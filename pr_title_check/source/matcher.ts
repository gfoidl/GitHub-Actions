export default class Matcher {
    public static doesTitleMatch(pattern: string, title: string): boolean {
        const regex = new RegExp(pattern);
        return regex.test(title);
    }
    //-------------------------------------------------------------------------
    public static doesTitleMatchJira(title: string): boolean {
        return /^\[[A-Z]+-\d+\](\s.*)?$/g.test(title);
    }
    //-------------------------------------------------------------------------
    public static doesBranchMatchJira(branch: string): boolean {
        return /^[A-Z]+-\d+(_|-|$)/g.test(branch);
    }
}
