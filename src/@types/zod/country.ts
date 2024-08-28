import { z } from 'zod';

import { NewCountryZodSchema } from './new-country';
import { CategoryListZodSchema } from './category-list';

import { CountryVersionZodSchema } from './country-version';
import { CountryLeaderZodSchema } from './country-leader';
import { MilitaryLeaderZodSchema } from './military-leader';
import { AdvisorZodSchema } from './advisor';
import { SpyZodSchema } from './spy';

export const CountryZodSchema = NewCountryZodSchema.extend({
    id: z.string().optional(),
    // Flags and Tags
    altNames: CategoryListZodSchema.extend({
        nameList: z.array(CountryVersionZodSchema),
    }).default({ nameList: [] }),
    // Leaders
    countryLeaders: CategoryListZodSchema.extend({
        leaderList: z.array(CountryLeaderZodSchema),
    }).default({ leaderList: [] }),
    // Army
    armyLeaders: CategoryListZodSchema.extend({
        armyList: z.array(MilitaryLeaderZodSchema),
    }).default({ armyList: [] }),
    // Navy
    navyLeaders: CategoryListZodSchema.extend({
        navyList: z.array(MilitaryLeaderZodSchema),
    }).default({ navyList: [] }),
    // Advisors
    advisors: CategoryListZodSchema.extend({
        advisorList: z.array(AdvisorZodSchema),
    }).default({ advisorList: [] }),
    // Spies
    spies: CategoryListZodSchema.extend({
        spyList: z.array(SpyZodSchema),
    }).default({ spyList: [] }),
});

export type Country = z.infer<typeof CountryZodSchema>;
