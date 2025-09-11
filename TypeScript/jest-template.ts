import {describe, expect, test} from '@jest/globals';
import myModule from '../src/my-module';

describe("Test group1",()=>
{
	test("Test1-1",()=>
	{
		expect( 'abc' ).toBe( 'abc' );
	});
});

