import "module-alias/register";
import Matcher                           from "@source/matcher";
import { TestFixture, TestCase, Expect } from "alsatian";
//-----------------------------------------------------------------------------
@TestFixture()
export class Matcher_doesTitleMatch {
    @TestCase("key-123"         , false)
    @TestCase("Key-123"         , false)
    @TestCase(" KEY-123"        , false)
    @TestCase(" [KEY]-123"      , false)
    @TestCase("KEY-1"           , false)
    @TestCase("KEY-12"          , false)
    @TestCase("KEY-213"         , false)
    @TestCase("[KEY]-1"         , false)
    @TestCase("[KEY-1]abcd"     , false)
    @TestCase("[KEY-1]"         , true)
    @TestCase("[KEY-12]"        , true)
    @TestCase("[KEY-2234]"      , true)
    @TestCase("[KEY-2234] swer" , true)
    public Pattern_title_given___OK(title: string, expected: boolean): void {
        const pattern = "^\\[KEY-\\d+\\](\\s.*)?$";
        const actual  = Matcher.doesTitleMatch(pattern, title);

        Expect(actual).toBe(expected);
    }
    //-------------------------------------------------------------------------
    @TestCase("key-123"                  , false)
    @TestCase("Key-123"                  , false)
    @TestCase(" KEY-123"                 , false)
    @TestCase(" [KEY]-123"               , false)
    @TestCase("KEY-1"                    , false)
    @TestCase("KEY-12"                   , false)
    @TestCase("KEY-213"                  , false)
    @TestCase("[KEY]-1"                  , false)
    @TestCase("[KEY-1]abcd"              , false)
    @TestCase("[KEY-1]"                  , true)
    @TestCase("[AB-1]"                   , true)
    @TestCase("[KEY-12]"                 , true)
    @TestCase("[KEY-2234]"               , true)
    @TestCase("[KEY-2234] swer"          , true)
    @TestCase("[DEF-2234] xysdfwer werwr", true)
    public Jira_pattern_title_given___OK(title: string, expected: boolean): void {
        const actual = Matcher.doesTitleMatchJira(title);

        Expect(actual).toBe(expected);
    }
}
