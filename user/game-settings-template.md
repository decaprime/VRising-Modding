---
title: Game Settings Template
parent: For Users
---

# ServerGameSettings.json Full Template

A complete `ServerGameSettings.json` showing every field with its default value. Copy this as a starting point and remove or adjust only what you need. See [Server Game Settings](/user/server-game-settings) for a searchable reference of each field.

The three array fields (`VBloodUnitSettings`, `UnlockedAchievements`, `UnlockedResearchs`) are empty by default. The template below includes example entries for each; see the [reference tables](#array-field-reference) at the bottom of this page for other IDs you can use.

```json
{
  "GameDifficulty": 1,
  "GameModeType": 1,
  "CastleDamageMode": 0,
  "SiegeWeaponHealth": 2,
  "PlayerDamageMode": 0,
  "CastleHeartDamageMode": 1,
  "PvPProtectionMode": 3,
  "DeathContainerPermission": 0,
  "RelicSpawnType": 0,
  "CanLootEnemyContainers": true,
  "BloodBoundEquipment": true,
  "TeleportBoundItems": true,
  "BatBoundItems": false,
  "BatBoundShards": false,
  "AllowGlobalChat": true,
  "AllWaypointsUnlocked": false,
  "FreeCastleRaid": false,
  "FreeCastleClaim": false,
  "FreeCastleDestroy": false,
  "InactivityKillEnabled": true,
  "InactivityKillTimeMin": 3600,
  "InactivityKillTimeMax": 604800,
  "InactivityKillSafeTimeAddition": 172800,
  "InactivityKillTimerMaxItemLevel": 84,
  "StartingProgressionLevel": 0,
  "WeaponSlots": 8,
  "DisableDisconnectedDeadEnabled": true,
  "DisableDisconnectedDeadTimer": 60,
  "DisconnectedSunImmunityTime": 300.0,
  "InventoryStacksModifier": 1.0,
  "DropTableModifier_General": 1.0,
  "DropTableModifier_Missions": 1.0,
  "DropTableModifier_StygianShards": 1.0,
  "SoulShard_DurabilityLossRate": 1.0,
  "MaterialYieldModifier_Global": 1.0,
  "BloodEssenceYieldModifier": 1.0,
  "JournalVBloodSourceUnitMaxDistance": 25.0,
  "PvPVampireRespawnModifier": 1.0,
  "CastleMinimumDistanceInFloors": 2,
  "ClanSize": 4,
  "BloodDrainModifier": 1.0,
  "DurabilityDrainModifier": 1.0,
  "GarlicAreaStrengthModifier": 1.0,
  "HolyAreaStrengthModifier": 1.0,
  "SilverStrengthModifier": 1.0,
  "SunDamageModifier": 1.0,
  "CastleDecayRateModifier": 1.0,
  "CastleBloodEssenceDrainModifier": 1.0,
  "CastleSiegeTimer": 420.0,
  "CastleUnderAttackTimer": 60.0,
  "CastleRaidTimer": 600.0,
  "CastleRaidProtectionTime": 1800.0,
  "CastleExposedFreeClaimTimer": 300.0,
  "CastleRelocationCooldown": 10800.0,
  "CastleRelocationEnabled": true,
  "AnnounceSiegeWeaponSpawn": true,
  "ShowSiegeWeaponMapIcon": false,
  "BuildCostModifier": 1.0,
  "RecipeCostModifier": 1.0,
  "CraftRateModifier": 1.0,
  "ResearchCostModifier": 1.0,
  "RefinementCostModifier": 1.0,
  "RefinementRateModifier": 1.0,
  "ResearchTimeModifier": 1.0,
  "DismantleResourceModifier": 1.0,
  "ServantConvertRateModifier": 1.0,
  "RepairCostModifier": 1.0,
  "Death_DurabilityFactorLoss": 0.125,
  "Death_DurabilityLossFactorAsResources": 1.0,
  "StarterEquipmentId": 0,
  "StarterResourcesId": 0,
  "VBloodUnitSettings": [
    {
      "UnitId": -2039908510,
      "UnitLevel": 30,
      "DefaultUnlocked": true
    }
  ],
  "UnlockedAchievements": [
    -1770927128,
    436375429,
    -1400391027,
    -2102083739,
    1566228114,
    1695239324,
    -54280488
  ],
  "UnlockedResearchs": [
    -495424062
  ],
  "GameTimeModifiers": {
    "DayDurationInSeconds": 1080.0,
    "DayStartHour": 9,
    "DayStartMinute": 0,
    "DayEndHour": 17,
    "DayEndMinute": 0,
    "BloodMoonFrequency_Min": 10,
    "BloodMoonFrequency_Max": 18,
    "BloodMoonBuff": 0.2
  },
  "VampireStatModifiers": {
    "MaxHealthModifier": 1.0,
    "PhysicalPowerModifier": 1.0,
    "SpellPowerModifier": 1.0,
    "ResourcePowerModifier": 1.0,
    "SiegePowerModifier": 1.0,
    "DamageReceivedModifier": 1.0,
    "ReviveCancelDelay": 5.0
  },
  "UnitStatModifiers_Global": {
    "MaxHealthModifier": 1.0,
    "PowerModifier": 1.0,
    "LevelIncrease": 0
  },
  "UnitStatModifiers_VBlood": {
    "MaxHealthModifier": 1.0,
    "PowerModifier": 1.0,
    "LevelIncrease": 0
  },
  "EquipmentStatModifiers_Global": {
    "MaxHealthModifier": 1.0,
    "ResourceYieldModifier": 1.0,
    "PhysicalPowerModifier": 1.0,
    "SpellPowerModifier": 1.0,
    "SiegePowerModifier": 1.0,
    "MovementSpeedModifier": 1.0
  },
  "CastleStatModifiers_Global": {
    "TickPeriod": 5.0,
    "SafetyBoxLimit": 1,
    "EyeStructuresLimit": 1,
    "TombLimit": 12,
    "VerminNestLimit": 4,
    "PrisonCellLimit": 24,
    "HeartLimits": {
      "Level1": {
        "FloorLimit": 50,
        "ServantLimit": 1,
        "HeightLimit": 3
      },
      "Level2": {
        "FloorLimit": 140,
        "ServantLimit": 3,
        "HeightLimit": 3
      },
      "Level3": {
        "FloorLimit": 240,
        "ServantLimit": 5,
        "HeightLimit": 3
      },
      "Level4": {
        "FloorLimit": 360,
        "ServantLimit": 7,
        "HeightLimit": 3
      },
      "Level5": {
        "FloorLimit": 550,
        "ServantLimit": 8,
        "HeightLimit": 3
      }
    },
    "CastleHeartLimitType": "User",
    "CastleLimit": 2,
    "NetherGateLimit": 1,
    "ThroneOfDarknessLimit": 1,
    "ArenaStationLimit": 5,
    "RoutingStationLimit": 10
  },
  "PlayerInteractionSettings": {
    "TimeZone": 0,
    "VSPlayerWeekdayTime": {
      "StartHour": 20,
      "StartMinute": 0,
      "EndHour": 22,
      "EndMinute": 0
    },
    "VSPlayerWeekendTime": {
      "StartHour": 20,
      "StartMinute": 0,
      "EndHour": 22,
      "EndMinute": 0
    },
    "VSCastleWeekdayTime": {
      "StartHour": 20,
      "StartMinute": 0,
      "EndHour": 22,
      "EndMinute": 0
    },
    "VSCastleWeekendTime": {
      "StartHour": 20,
      "StartMinute": 0,
      "EndHour": 22,
      "EndMinute": 0
    }
  },
  "TraderModifiers": {
    "StockModifier": 1.0,
    "PriceModifier": 1.0,
    "RestockTimerModifier": 1.0
  },
  "WarEventGameSettings": {
    "Interval": 0,
    "MajorDuration": 1,
    "MinorDuration": 1,
    "WeekdayTime": {
      "StartHour": 0,
      "StartMinute": 0,
      "EndHour": 23,
      "EndMinute": 59
    },
    "WeekendTime": {
      "StartHour": 0,
      "StartMinute": 0,
      "EndHour": 23,
      "EndMinute": 59
    },
    "ScalingPlayers1": {
      "PointsModifier": 1.0,
      "DropModifier": 1.0
    },
    "ScalingPlayers2": {
      "PointsModifier": 0.5,
      "DropModifier": 0.5
    },
    "ScalingPlayers3": {
      "PointsModifier": 0.25,
      "DropModifier": 0.25
    },
    "ScalingPlayers4": {
      "PointsModifier": 0.25,
      "DropModifier": 0.25
    }
  }
}
```

## Array field reference

The tables below list only the IDs used in the template above. For a full list of valid IDs for each array, see the [Server Game Settings](/user/server-game-settings) reference page.

### VBloodUnitSettings

Each entry has three fields:

| Field | Type | Description |
|---|---|---|
| `UnitId` | int | Prefab ID of the VBlood boss |
| `UnitLevel` | int (0–255) | Level override for the boss |
| `DefaultUnlocked` | bool | When `true`, newly created characters begin with this boss's powers and recipes already unlocked |

| ID | Unit |
|---|---|
| `-2039908510` | Putrid Rat (`CHAR_Vermin_DireRat_VBlood`) |

### UnlockedAchievements

An array of journal quest prefab IDs that will be pre-completed for all players on the server.

| ID | Quest |
|---|---|
| `-1770927128` | Collecting the Remains |
| `436375429` | Wielding the Sword |
| `-1400391027` | Mastering Magic |
| `-2102083739` | Defensive Measures |
| `1566228114` | Hides of the Wild |
| `1695239324` | Into the Woods |
| `-54280488` | Gathering |

### UnlockedResearchs

An array of prefab IDs for research that should be pre-unlocked for all players.

| ID | Research |
|---|---|
| `-495424062` | All Tier 1 Research |
