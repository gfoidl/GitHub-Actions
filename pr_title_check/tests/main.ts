import "module-alias/register";
import * as main from "@source/main";
import { TestFixture, TestCase, Expect } from "alsatian";
//-----------------------------------------------------------------------------
@TestFixture()
export class MainTests {
    @TestCase(3, 4)
    public add_ok(a: number, b: number): void {
        const actual = main.add(a, b);

        Expect(actual).toBe(7);
    }
    //-------------------------------------------------------------------------
    @TestCase(5, 2)
    public diff_ok(a: number, b: number): void {
        const actual = main.diff(a, b);

        Expect(actual).toBe(3);
    }
}


//import {wait} from '../src/wait'
//import * as process from 'process'
//import * as cp from 'child_process'
//import * as path from 'path'

//test('throws invalid number', async () => {
//  const input = parseInt('foo', 10)
//  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
//})

//test('wait 500 ms', async () => {
//  const start = new Date()
//  await wait(500)
//  const end = new Date()
//  var delta = Math.abs(end.getTime() - start.getTime())
//  expect(delta).toBeGreaterThan(450)
//})

//// shows how the runner will run a javascript action with env / stdout protocol
//test('test runs', () => {
//  process.env['INPUT_MILLISECONDS'] = '500'
//  const ip = path.join(__dirname, '..', 'lib', 'main.js')
//  const options: cp.ExecSyncOptions = {
//    env: process.env
//  }
//  console.log(cp.execSync(`node ${ip}`, options).toString())
//})
