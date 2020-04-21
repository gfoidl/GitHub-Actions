export default class Matcher {
    public static isMatch(pattern: string, title: string): boolean {
        const regex = new RegExp(pattern);
        return regex.test(title);
    }
    //-------------------------------------------------------------------------
    public static isJiraMatch(title: string): boolean {
        const pattern = /^\[[A-Z]+-\d+\](\s.*)?$/g;

        return pattern.test(title);
    }
}
