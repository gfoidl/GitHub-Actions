import "module-alias/register";
import Matcher                           from "@source/matcher";
import { TestFixture, TestCase, Expect } from "alsatian";
//-----------------------------------------------------------------------------
@TestFixture()
export class Matcher_doesBranchMatchJira {
    @TestCase("key-123"         , false)
    @TestCase("Key-123"         , false)
    @TestCase(" KEY-123"        , false)
    @TestCase(" [KEY]-123"      , false)
    @TestCase("[KEY]-1"         , false)
    @TestCase("[KEY-1]abcd"     , false)
    @TestCase("[KEY-1]"         , false)
    @TestCase("[KEY-12]"        , false)
    @TestCase("[KEY-2234]"      , false)
    @TestCase("[KEY-2234] swer" , false)
    @TestCase("KEY-213 werwer"  , false)
    @TestCase("KEY-1"           , true)
    @TestCase("KEY-12"          , true)
    @TestCase("KEY-213"         , true)
    @TestCase("KEY-213_werwer"  , true)
    @TestCase("KEY-213-werwer"  , true)
    public Pattern_title_given___OK(branch: string, expected: boolean): void {
        const actual = Matcher.doesBranchMatchJira(branch);

        Expect(actual).toBe(expected);
    }
}
