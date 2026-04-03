/**
 * ============================================================
 * GETACTIVITYDETAIL.JS - Mock Handler for activity.getActivityDetail
 * ============================================================
 * 
 * Purpose: Returns full detail for a specific activity
 * Called when user taps an activity from the activity list
 * 
 * HAR Reference: 13 calls in HAR session, 3 full examples captured
 *   - activityType 1002: Growth Quest (13 pages, multi-task)
 *   - activityType 2001: Hero Grand Kickback (items-based)
 *   - activityType 2002: Orange Hero Assembly (items-based)
 * 
 * CRITICAL: Response MUST include `act._activityType` — Hakim crashes
 * without it: "Cannot read properties of undefined (reading '_activityType')"
 * 
 * Pattern: Echo loop for request fields, add act/uact/forceEndTime
 * 
 * Author: Local SDK Bridge
 * Version: 1.0.0
 * ============================================================
 */

(function(window) {
    'use strict';

    var LOG = {
        prefix: '\uD83C\uDFAA [ACTIVITY]',
        _log: function(level, icon, message, data) {
            var timestamp = new Date().toISOString().substr(11, 12);
            var styles = {
                success: 'color: #22c55e; font-weight: bold;',
                info: 'color: #6b7280;',
                warn: 'color: #f59e0b; font-weight: bold;',
                error: 'color: #ef4444; font-weight: bold;'
            };
            var style = styles[level] || styles.info;
            var format = '%c' + this.prefix + ' ' + icon + ' [' + timestamp + '] ' + message;
            if (data !== undefined) {
                console.log(format + ' %o', style, data);
            } else {
                console.log(format, style);
            }
        },
        success: function(msg, data) { this._log('success', '\u2705', msg, data); },
        info: function(msg, data) { this._log('info', '\u2139\uFE0F', msg, data); },
        warn: function(msg, data) { this._log('warn', '\u26A0\uFE0F', msg, data); },
        error: function(msg, data) { this._log('error', '\u274C', msg, data); }
    };

    // ========================================================
    // FULL ACTIVITY DATA FROM HAR (3 known types with complete detail)
    // ========================================================
    var KNOWN_ACTS = {
    "44bd872c-65aa-4253-8a00-94bdc172f49e": {
        "_id": "44bd872c-65aa-4253-8a00-94bdc172f49e",
        "_templateId": "",
        "_templateName": "（开服）成长任务",
        "_name": "Growth Quest",
        "__name": "lang_1002_72",
        "_des": "Complete the system quests to get handsome rewards to power up fast during the event time!",
        "__des": "lang_1002_103",
        "_icon": "/activity/新用户活动/huodongnew47.png",
        "_image": "/activity/新用户活动/huodongnew26.jpg",
        "_displayIndex": 7,
        "_showRed": true,
        "_activityType": 1002,
        "_cycleType": 1,
        "_enable": true,
        "_timeType": 2,
        "_newUserUsing": true,
        "_isloop": false,
        "_loopInterval": 0,
        "_startDay": 0,
        "_durationDay": 7,
        "_oldUserVip": 0,
        "_oldUserServerOpenDay": 0,
        "_oldUserServerOpenDayEnd": 0,
        "_oldUserOfflineDay": 0,
        "_startTime": 0,
        "_endTime": 0,
        "_loopCount": 0,
        "_loopTag": "",
        "_timestamp": 1774802220616,
        "_hideos": "",
        "_limitReward": {
            "_items": {}
        },
        "_pages": {
            "1": {
                "_title": "Blacksmith",
                "__title": "lang_1002_154",
                "_pageType": 1,
                "_tasks": {
                    "1": {
                        "_des": "Gear Compose 10 times",
                        "__des": "lang_1002_119",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 50000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Gear Compose 20 times",
                        "__des": "lang_1002_120",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 55000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Gear Compose 30 times",
                        "__des": "lang_1002_121",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 60000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Gear Compose 40 times",
                        "__des": "lang_1002_122",
                        "_target": 40,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 65000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Gear Compose 50 times",
                        "__des": "lang_1002_123",
                        "_target": 50,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 70000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Gear Compose 60 times",
                        "__des": "lang_1002_124",
                        "_target": 60,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 75000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Gear Compose 70 times",
                        "__des": "lang_1002_125",
                        "_target": 70,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 80000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Gear Compose 80 times",
                        "__des": "lang_1002_126",
                        "_target": 80,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 85000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Gear Compose 90 times",
                        "__des": "lang_1002_127",
                        "_target": 90,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 90000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Gear Compose 100 times",
                        "__des": "lang_1002_118",
                        "_target": 100,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 95000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 99
            },
            "2": {
                "_title": "Market",
                "__title": "lang_1002_40",
                "_pageType": 2,
                "_tasks": {
                    "1": {
                        "_des": "Refresh 5 times",
                        "__des": "lang_1002_16",
                        "_target": 5,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 50000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Refresh 10 times",
                        "__des": "lang_1002_11",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 55000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Refresh 20 times",
                        "__des": "lang_1002_12",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 60000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Refresh 30 times",
                        "__des": "lang_1002_13",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 65000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Refresh 40 times",
                        "__des": "lang_1002_14",
                        "_target": 40,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 70000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Refresh 50 times",
                        "__des": "lang_1002_15",
                        "_target": 50,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 75000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Refresh 60 times",
                        "__des": "lang_1002_17",
                        "_target": 60,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 80000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Refresh 70 times",
                        "__des": "lang_1002_18",
                        "_target": 70,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 85000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Refresh 80 times",
                        "__des": "lang_1002_19",
                        "_target": 80,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 90000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Refresh 90 times",
                        "__des": "lang_1002_20",
                        "_target": 90,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 95000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "11": {
                        "_des": "Refresh 100 times",
                        "__des": "lang_1002_10",
                        "_target": 100,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 100000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 98
            },
            "3": {
                "_title": "Tournament",
                "__title": "lang_1002_102",
                "_pageType": 3,
                "_tasks": {
                    "1": {
                        "_des": "Challenge 5 times",
                        "__des": "lang_1002_82",
                        "_target": 5,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 20
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Challenge 10 times",
                        "__des": "lang_1002_73",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 30
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Challenge 15 times",
                        "__des": "lang_1002_74",
                        "_target": 15,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 40
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Challenge 20 times",
                        "__des": "lang_1002_75",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 50
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Challenge 25 times",
                        "__des": "lang_1002_76",
                        "_target": 25,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 60
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Challenge 30 times",
                        "__des": "lang_1002_77",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 70
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Challenge 35 times",
                        "__des": "lang_1002_78",
                        "_target": 35,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 80
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Challenge 40 times",
                        "__des": "lang_1002_79",
                        "_target": 40,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 90
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Challenge 45 times",
                        "__des": "lang_1002_80",
                        "_target": 45,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 100
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Challenge 50 times",
                        "__des": "lang_1002_81",
                        "_target": 50,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 112,
                                        "_num": 110
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 96
            },
            "4": {
                "_title": "Resource",
                "__title": "lang_1002_128",
                "_pageType": 4,
                "_tasks": {
                    "1": {
                        "_des": "Successfully challenge 5 times",
                        "__des": "lang_1002_71",
                        "_target": 5,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 5000
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 200
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Successfully challenge 10 times",
                        "__des": "lang_1002_62",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 5500
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 200
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Successfully challenge 15 times",
                        "__des": "lang_1002_63",
                        "_target": 15,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 6000
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 300
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Successfully challenge 20 times",
                        "__des": "lang_1002_64",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 6500
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 300
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Successfully challenge 25 times",
                        "__des": "lang_1002_65",
                        "_target": 25,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 7000
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 400
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Successfully challenge 30 times",
                        "__des": "lang_1002_66",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 7500
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 400
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Successfully challenge 35 times",
                        "__des": "lang_1002_67",
                        "_target": 35,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 8000
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 500
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Successfully challenge 40 times",
                        "__des": "lang_1002_68",
                        "_target": 40,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 8500
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 500
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Successfully challenge 45 times",
                        "__des": "lang_1002_69",
                        "_target": 45,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 9000
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 600
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Successfully challenge 50 times",
                        "__des": "lang_1002_70",
                        "_target": 50,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 131,
                                        "_num": 9500
                                    },
                                    {
                                        "_id": 132,
                                        "_num": 600
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 97
            },
            "5": {
                "_title": "Temple Trial",
                "__title": "lang_1002_104",
                "_pageType": 5,
                "_tasks": {
                    "1": {
                        "_des": "Pass Trial 10",
                        "__des": "lang_1002_131",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Pass Trial 20",
                        "__des": "lang_1002_133",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Pass Trial 30",
                        "__des": "lang_1002_135",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Pass Trial 40",
                        "__des": "lang_1002_138",
                        "_target": 40,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Pass Trial 50",
                        "__des": "lang_1002_140",
                        "_target": 50,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 3
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Pass Trial 60",
                        "__des": "lang_1002_143",
                        "_target": 60,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 3
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Pass Trial 70",
                        "__des": "lang_1002_145",
                        "_target": 70,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 4
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Pass Trial 80",
                        "__des": "lang_1002_148",
                        "_target": 80,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 4
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Pass Trial 90",
                        "__des": "lang_1002_151",
                        "_target": 90,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 5
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Pass Trial 100",
                        "__des": "lang_1002_129",
                        "_target": 100,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 5
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 95
            },
            "6": {
                "_title": "Gear Instance",
                "__title": "lang_1002_117",
                "_pageType": 6,
                "_tasks": {
                    "1": {
                        "_des": "Successfully challenge 2 times",
                        "__des": "lang_1002_58",
                        "_target": 2,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 50000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Successfully challenge 4 times",
                        "__des": "lang_1002_59",
                        "_target": 4,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 55000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Successfully challenge 6 times",
                        "__des": "lang_1002_60",
                        "_target": 6,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 60000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Successfully challenge 8 times",
                        "__des": "lang_1002_61",
                        "_target": 8,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 65000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Successfully challenge 10 times",
                        "__des": "lang_1002_52",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 70000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Successfully challenge 12 times",
                        "__des": "lang_1002_53",
                        "_target": 12,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 75000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Successfully challenge 14 times",
                        "__des": "lang_1002_54",
                        "_target": 14,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 80000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Successfully challenge 16 times",
                        "__des": "lang_1002_55",
                        "_target": 16,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 85000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Successfully challenge 18 times",
                        "__des": "lang_1002_56",
                        "_target": 18,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 90000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Successfully challenge 20 times",
                        "__des": "lang_1002_57",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 101,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 95000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 91
            },
            "7": {
                "_title": "Snake Way",
                "__title": "lang_1002_116",
                "_pageType": 7,
                "_tasks": {
                    "1": {
                        "_des": "Pass Stage 3",
                        "__des": "lang_1002_136",
                        "_target": 3,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 20000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Pass Stage 5",
                        "__des": "lang_1002_141",
                        "_target": 5,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 20000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Pass Stage 7",
                        "__des": "lang_1002_146",
                        "_target": 7,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 20000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Pass Stage 8",
                        "__des": "lang_1002_149",
                        "_target": 8,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 20000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Pass Stage 9",
                        "__des": "lang_1002_152",
                        "_target": 9,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 20000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Pass Stage 10",
                        "__des": "lang_1002_130",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 146,
                                        "_num": 3
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 20000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 93
            },
            "11": {
                "_title": "Mystical Adventure",
                "__title": "lang_1002_100",
                "_pageType": 11,
                "_tasks": {
                    "1": {
                        "_des": "Go on Mystical Adventure 5 times",
                        "__des": "lang_1002_9",
                        "_target": 5,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 135,
                                        "_num": 100
                                    },
                                    {
                                        "_id": 139,
                                        "_num": 10
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Go on Mystical Adventure 10 times",
                        "__des": "lang_1002_4",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 135,
                                        "_num": 200
                                    },
                                    {
                                        "_id": 139,
                                        "_num": 20
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Go on Mystical Adventure 15 times",
                        "__des": "lang_1002_5",
                        "_target": 15,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 135,
                                        "_num": 300
                                    },
                                    {
                                        "_id": 139,
                                        "_num": 30
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Go on Mystical Adventure 20 times",
                        "__des": "lang_1002_6",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 135,
                                        "_num": 400
                                    },
                                    {
                                        "_id": 139,
                                        "_num": 50
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Go on Mystical Adventure 25 times",
                        "__des": "lang_1002_7",
                        "_target": 25,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 135,
                                        "_num": 500
                                    },
                                    {
                                        "_id": 139,
                                        "_num": 70
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Go on Mystical Adventure 30 times",
                        "__des": "lang_1002_8",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 135,
                                        "_num": 600
                                    },
                                    {
                                        "_id": 139,
                                        "_num": 100
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 90
            },
            "13": {
                "_title": "The Cell Game",
                "__title": "lang_4005_323",
                "_pageType": 13,
                "_tasks": {
                    "1": {
                        "_des": "Pass Trial 1",
                        "__des": "lang_1002_132",
                        "_target": 1,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4299,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 100
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Pass Trial 2",
                        "__des": "lang_1002_134",
                        "_target": 2,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4299,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 120
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Pass Trial 3",
                        "__des": "lang_1002_137",
                        "_target": 3,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4299,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 140
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Pass Trial 4",
                        "__des": "lang_1002_139",
                        "_target": 4,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4299,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 160
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Pass Trial 5",
                        "__des": "lang_1002_142",
                        "_target": 5,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4399,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 180
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Pass Trial 6",
                        "__des": "lang_1002_144",
                        "_target": 6,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4399,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 200
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Pass Trial 7",
                        "__des": "lang_1002_147",
                        "_target": 7,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4399,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 220
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Pass Trial 8",
                        "__des": "lang_1002_150",
                        "_target": 8,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4399,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 240
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Pass Trial 9",
                        "__des": "lang_1002_153",
                        "_target": 9,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4399,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 260
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Pass Trial 10",
                        "__des": "lang_1002_131",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 4399,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 137,
                                        "_num": 300
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 92
            },
            "14": {
                "_title": "Mark Instance",
                "__title": "lang_1002_22",
                "_pageType": 14,
                "_tasks": {
                    "1": {
                        "_des": "Successfully challenge 2 times",
                        "__des": "lang_1002_48",
                        "_target": 2,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 50
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Successfully challenge 4 times",
                        "__des": "lang_1002_49",
                        "_target": 4,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 100
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Successfully challenge 6 times",
                        "__des": "lang_1002_50",
                        "_target": 6,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 150
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Successfully challenge 8 times",
                        "__des": "lang_1002_51",
                        "_target": 8,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 200
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Successfully challenge 10 times",
                        "__des": "lang_1002_42",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 250
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Successfully challenge 12 times",
                        "__des": "lang_1002_43",
                        "_target": 12,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 300
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Successfully challenge 14 times",
                        "__des": "lang_1002_44",
                        "_target": 14,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 350
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Successfully challenge 16 times",
                        "__des": "lang_1002_45",
                        "_target": 16,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 400
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Successfully challenge 18 times",
                        "__des": "lang_1002_46",
                        "_target": 18,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 450
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Successfully challenge 20 times",
                        "__des": "lang_1002_47",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 208,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 138,
                                        "_num": 500
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 87
            },
            "15": {
                "_title": "Karin Tower",
                "__title": "lang_1002_21",
                "_pageType": 15,
                "_tasks": {
                    "1": {
                        "_des": "Challenge 5 times",
                        "__des": "lang_1002_93",
                        "_target": 5,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 10
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Challenge 10 times",
                        "__des": "lang_1002_83",
                        "_target": 10,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 20
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Challenge 15 times",
                        "__des": "lang_1002_84",
                        "_target": 15,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 30
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Challenge 20 times",
                        "__des": "lang_1002_85",
                        "_target": 20,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 40
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Challenge 25 times",
                        "__des": "lang_1002_86",
                        "_target": 25,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 50
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Challenge 30 times",
                        "__des": "lang_1002_87",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 60
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Challenge 35 times",
                        "__des": "lang_1002_88",
                        "_target": 35,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 70
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Challenge 40 times",
                        "__des": "lang_1002_89",
                        "_target": 40,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 80
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Challenge 45 times",
                        "__des": "lang_1002_90",
                        "_target": 45,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 90
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Challenge 50 times",
                        "__des": "lang_1002_91",
                        "_target": 50,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 100
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "11": {
                        "_des": "Challenge 55 times",
                        "__des": "lang_1002_92",
                        "_target": 55,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 134,
                                        "_num": 120
                                    },
                                    {
                                        "_id": 146,
                                        "_num": 3
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 88
            },
            "16": {
                "_title": "Wild Adventure",
                "__title": "lang_1002_105",
                "_pageType": 16,
                "_tasks": {
                    "1": {
                        "_des": "Acquire 15 Chests",
                        "__des": "lang_1002_110",
                        "_target": 15,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 100
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 50000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Acquire 30 Chests",
                        "__des": "lang_1002_111",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 120
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 55000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Acquire 45 Chests",
                        "__des": "lang_1002_112",
                        "_target": 45,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 140
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 60000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Acquire 60 Chests",
                        "__des": "lang_1002_113",
                        "_target": 60,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 160
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 65000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Acquire 75 Chests",
                        "__des": "lang_1002_114",
                        "_target": 75,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 180
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 70000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Acquire 90 Chests",
                        "__des": "lang_1002_115",
                        "_target": 90,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 200
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 75000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Acquire 105 Chests",
                        "__des": "lang_1002_106",
                        "_target": 105,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 220
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 80000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Acquire 120 Chests",
                        "__des": "lang_1002_107",
                        "_target": 120,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 240
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 85000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Acquire 135 Chests",
                        "__des": "lang_1002_108",
                        "_target": 135,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 260
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 90000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Acquire 150 Chests",
                        "__des": "lang_1002_109",
                        "_target": 150,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 136,
                                        "_num": 300
                                    },
                                    {
                                        "_id": 102,
                                        "_num": 95000
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 94
            },
            "17": {
                "_title": "Time Leap",
                "__title": "lang_1002_101",
                "_pageType": 17,
                "_tasks": {
                    "1": {
                        "_des": "Complete Time Leap 3 times",
                        "__des": "lang_1002_37",
                        "_target": 3,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "2": {
                        "_des": "Complete Time Leap 6 times",
                        "__des": "lang_1002_38",
                        "_target": 6,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "3": {
                        "_des": "Complete Time Leap 9 times",
                        "__des": "lang_1002_39",
                        "_target": 9,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 1
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "4": {
                        "_des": "Complete Time Leap 12 times",
                        "__des": "lang_1002_30",
                        "_target": 12,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "5": {
                        "_des": "Complete Time Leap 15 times",
                        "__des": "lang_1002_31",
                        "_target": 15,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "6": {
                        "_des": "Complete Time Leap 18 times",
                        "__des": "lang_1002_32",
                        "_target": 18,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 2
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "7": {
                        "_des": "Complete Time Leap 21 times",
                        "__des": "lang_1002_33",
                        "_target": 21,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 3
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "8": {
                        "_des": "Complete Time Leap 24 times",
                        "__des": "lang_1002_34",
                        "_target": 24,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 3
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "9": {
                        "_des": "Complete Time Leap 27 times",
                        "__des": "lang_1002_35",
                        "_target": 27,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 3
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    },
                    "10": {
                        "_des": "Complete Time Leap 30 times",
                        "__des": "lang_1002_36",
                        "_target": 30,
                        "_reward": {
                            "_normalReward": {
                                "_items": [
                                    {
                                        "_id": 2851,
                                        "_num": 5
                                    },
                                    {
                                        "_id": 122,
                                        "_num": 5
                                    }
                                ]
                            },
                            "_randReward": [],
                            "_anyReward": {
                                "_icon": "",
                                "_anyReward": []
                            }
                        }
                    }
                },
                "_displayIndex": 89
            }
        },
        "__ruleDes": null,
        "_displayAdvance": 0,
        "_displayExtend": 0
    },
    "91275b4b-0505-4a46-989b-cae0bd1c6c76": {
        "_id": "91275b4b-0505-4a46-989b-cae0bd1c6c76",
        "_templateId": "",
        "_templateName": "（新版开服）英雄大返利",
        "_name": "Hero Grand Kickback",
        "__name": "lang_2001_162",
        "_des": " During the event time, get the chance to make the lucky draw every time you get  1 orange or purple quality hero! (Heroes you get from Altar shop exchange and Shards Compose are not included)",
        "__des": "lang_2001_159",
        "_icon": "/activity/新服活动/huodongnew39.png",
        "_image": "/activity/新服活动/huodongnew44.jpg",
        "_displayIndex": 8,
        "_showRed": true,
        "_activityType": 2001,
        "_cycleType": 1,
        "_enable": true,
        "_timeType": 2,
        "_newUserUsing": true,
        "_isloop": false,
        "_loopInterval": 0,
        "_startDay": 0,
        "_durationDay": 7,
        "_oldUserVip": 0,
        "_oldUserServerOpenDay": 0,
        "_oldUserServerOpenDayEnd": 0,
        "_oldUserOfflineDay": 0,
        "_startTime": 0,
        "_endTime": 0,
        "_loopCount": 0,
        "_loopTag": "",
        "_timestamp": 1774802220587,
        "_hideos": "",
        "_limitReward": {
            "_items": {}
        },
        "_items": {
            "1": {
                "_des": "Obtained an orange hero",
                "__des": "lang_2001_160",
                "_target": 1,
                "_heroQualitys": [
                    5,
                    6,
                    7
                ],
                "_reward": {
                    "_normalReward": {
                        "_items": []
                    },
                    "_randReward": [
                        {
                            "_icon": "/activity/新用户活动/expcap.png",
                            "_randReward": {
                                "_groups": {
                                    "1": {
                                        "_groupId": 1,
                                        "_totalWeight": 100,
                                        "_items": [
                                            {
                                                "_itemId": 131,
                                                "_num": 6800,
                                                "_weight": 20
                                            },
                                            {
                                                "_itemId": 131,
                                                "_num": 8800,
                                                "_weight": 50
                                            },
                                            {
                                                "_itemId": 131,
                                                "_num": 18800,
                                                "_weight": 17
                                            },
                                            {
                                                "_itemId": 131,
                                                "_num": 28800,
                                                "_weight": 10
                                            },
                                            {
                                                "_itemId": 131,
                                                "_num": 68800,
                                                "_weight": 3
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "2": {
                "_des": "Obtained a purple hero",
                "__des": "lang_2001_161",
                "_target": 1,
                "_heroQualitys": [
                    4
                ],
                "_reward": {
                    "_normalReward": {
                        "_items": []
                    },
                    "_randReward": [
                        {
                            "_icon": "/activity/新用户活动/gold.png",
                            "_randReward": {
                                "_groups": {
                                    "1": {
                                        "_groupId": 1,
                                        "_totalWeight": 100,
                                        "_items": [
                                            {
                                                "_itemId": 102,
                                                "_num": 5800,
                                                "_weight": 30
                                            },
                                            {
                                                "_itemId": 102,
                                                "_num": 6800,
                                                "_weight": 35
                                            },
                                            {
                                                "_itemId": 102,
                                                "_num": 8800,
                                                "_weight": 20
                                            },
                                            {
                                                "_itemId": 102,
                                                "_num": 18800,
                                                "_weight": 12
                                            },
                                            {
                                                "_itemId": 102,
                                                "_num": 28800,
                                                "_weight": 3
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            }
        },
        "__ruleDes": null,
        "_displayAdvance": 0,
        "_displayExtend": 0
    },
    "f764c7b8-137e-4537-9209-0e7e4febea58": {
        "_id": "f764c7b8-137e-4537-9209-0e7e4febea58",
        "_templateId": "",
        "_templateName": "(新版开服)橙将集结号",
        "_name": "Orange Hero Assembly",
        "__name": "lang_2002_164",
        "_des": "  During the event time, the more orange quality heroes you unlock, the more rewards you’ll get! (Heroes you get from Altar shop exchange and Shards Compose are not included)",
        "__des": "lang_2002_163",
        "_icon": "/activity/新服活动/huodongnew40.png?rnd=171461604461607",
        "_image": "/activity/新服活动/huodongnew4.jpg?rnd=21921604461608",
        "_displayIndex": 9,
        "_showRed": true,
        "_activityType": 2002,
        "_cycleType": 1,
        "_enable": true,
        "_timeType": 2,
        "_newUserUsing": true,
        "_isloop": false,
        "_loopInterval": 0,
        "_startDay": 0,
        "_durationDay": 7,
        "_oldUserVip": 0,
        "_oldUserServerOpenDay": 0,
        "_oldUserServerOpenDayEnd": 0,
        "_oldUserOfflineDay": 0,
        "_startTime": 1604332800000,
        "_endTime": 1604937599000,
        "_loopCount": 0,
        "_loopTag": "",
        "_timestamp": 1774802220559,
        "_hideos": "",
        "_limitReward": {
            "_items": {}
        },
        "_items": {
            "1": {
                "_target": 2,
                "_heroQuality": 5,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 2
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "2": {
                "_target": 5,
                "_heroQuality": 5,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 2
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "3": {
                "_target": 8,
                "_heroQuality": 5,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 3
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "4": {
                "_target": 1,
                "_heroQuality": 6,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 2
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "5": {
                "_target": 2,
                "_heroQuality": 6,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 3
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "6": {
                "_target": 3,
                "_heroQuality": 6,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 4
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "7": {
                "_target": 4,
                "_heroQuality": 6,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 6
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "8": {
                "_target": 6,
                "_heroQuality": 6,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 10
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "9": {
                "_target": 12,
                "_heroQuality": 5,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 3
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "10": {
                "_target": 18,
                "_heroQuality": 5,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 5
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "11": {
                "_target": 25,
                "_heroQuality": 5,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 5
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            },
            "12": {
                "_target": 35,
                "_heroQuality": 5,
                "_reward": {
                    "_normalReward": {
                        "_items": [
                            {
                                "_id": 123,
                                "_num": 8
                            }
                        ]
                    },
                    "_randReward": [],
                    "_anyReward": {
                        "_icon": "",
                        "_anyReward": []
                    }
                }
            }
        },
        "__ruleDes": null,
        "_displayAdvance": 0,
        "_displayExtend": 0
    }
};

    // ========================================================
    // BRIEF DATA FOR ALL 13 ACTIVITIES (from getActivityBrief HAR)
    // Used to construct minimal act for unknown activity types
    // ========================================================
    var BRIEF_DATA = {
    "1c19108c-b90b-4918-95fb-b401a799b414": {
        "templateName": "新服特惠三选一礼包",
        "name": "Hero Value Pack",
        "icon": "/activity/新服活动/xinfuyingxiongtehui_rukou.png?rnd=851641672116391",
        "displayIndex": 0,
        "showRed": true,
        "actCycle": 2,
        "actType": 5037
    },
    "97114e80-830c-4d63-bb72-fb3a30eb67e8": {
        "templateName": "（开服）新服特惠包（新）",
        "name": "New Server Discount Pack",
        "icon": "/activity/新服活动/huodongnew42.png",
        "displayIndex": 2,
        "showRed": true,
        "actCycle": 2,
        "actType": 2003
    },
    "2c6125f1-c012-492d-9022-b8e3f29fbf25": {
        "templateName": "（开服）今日特价（新）",
        "name": "Discount Today",
        "icon": "/activity/强者之路/huodongnew205.png?rnd=574051578983873",
        "displayIndex": 3,
        "showRed": true,
        "actCycle": 2,
        "actType": 5003
    },
    "205e06d9-fcb2-43f1-929e-16b4f4de2fcb": {
        "templateName": "（新版开服）每日累充",
        "name": "Daily accumulated top-up",
        "icon": "/activity/新服活动/huodongnew35.png?rnd=649231590140442",
        "displayIndex": 6,
        "showRed": true,
        "actCycle": 2,
        "actType": 2007
    },
    "5cd9f34d-18ac-445c-b782-5ced80f10c10": {
        "templateName": "（开服）累充豪礼（新）",
        "name": "Cumulative Top-up Gift",
        "icon": "/activity/强者之路/huodongnew107.png",
        "displayIndex": 4,
        "showRed": true,
        "actCycle": 2,
        "actType": 2004
    },
    "44bd872c-65aa-4253-8a00-94bdc172f49e": {
        "templateName": "（开服）成长任务",
        "name": "Growth Quest",
        "icon": "/activity/新用户活动/huodongnew47.png",
        "displayIndex": 7,
        "showRed": true,
        "actCycle": 1,
        "actType": 1002
    },
    "91275b4b-0505-4a46-989b-cae0bd1c6c76": {
        "templateName": "（新版开服）英雄大返利",
        "name": "Hero Grand Kickback",
        "icon": "/activity/新服活动/huodongnew39.png",
        "displayIndex": 8,
        "showRed": true,
        "actCycle": 1,
        "actType": 2001
    },
    "f764c7b8-137e-4537-9209-0e7e4febea58": {
        "templateName": "(新版开服)橙将集结号",
        "name": "Orange Hero Assembly",
        "icon": "/activity/新服活动/huodongnew40.png?rnd=171461604461607",
        "displayIndex": 9,
        "showRed": true,
        "actCycle": 1,
        "actType": 2002
    },
    "c53f9ca8-9262-4d97-9219-fd514fca1b5d": {
        "templateName": "（新版开服）抽卡送豪礼",
        "name": "Summon Return",
        "icon": "/activity/主题卡活动/huodongnew234.png?rnd=680761591703911",
        "displayIndex": 10,
        "showRed": true,
        "actCycle": 2,
        "actType": 5005
    },
    "5a093690-42d1-4acb-b3e5-9fc27a80fdd0": {
        "templateName": "（新版开服）点亮图鉴",
        "name": "Ignition Illustration",
        "icon": "/activity/抢占先机/huodongnew137.png",
        "displayIndex": 10,
        "showRed": true,
        "actCycle": 4,
        "actType": 4001
    },
    "67b6ee00-3eb6-40f6-b2fb-dfbb29d6827d": {
        "templateName": "（新版开服）神殿争先",
        "name": "Temple Contest",
        "icon": "/activity/抢占先机/huodongnew142.png?rnd=561581579242342",
        "displayIndex": 9,
        "showRed": true,
        "actCycle": 4,
        "actType": 4003
    },
    "3ad3406d-1c09-47f3-8ba5-86b0d5d90d93": {
        "templateName": "（开服）7日任意充",
        "name": "7-Day Top-up At Will",
        "icon": "/activity/新用户活动/huodongnew372.png?rnd=558541576031269",
        "displayIndex": 85,
        "showRed": true,
        "actCycle": 1,
        "actType": 1003
    },
    "b56bde3a-2312-41a7-b920-a61f75e73f2e": {
        "templateName": "开服七日登陆有礼",
        "name": "Event Sign-in",
        "icon": "/activity/新用户活动/huodongnew43.png?rnd=92791669347101",
        "displayIndex": 9999,
        "showRed": false,
        "actCycle": 8,
        "actType": 1001
    }
};

    // ========================================================
    // STORAGE KEY for persisting uact state
    // ========================================================
    var UACT_STORAGE_KEY = 'dragonball_activity_uact';

    function loadUactStates() {
        try {
            var stored = localStorage.getItem(UACT_STORAGE_KEY);
            if (stored) return JSON.parse(stored);
        } catch (e) {}
        return {};
    }

    function saveUactStates(states) {
        try {
            localStorage.setItem(UACT_STORAGE_KEY, JSON.stringify(states));
        } catch (e) {}
    }

    // ========================================================
    // Build minimal act object from brief data
    // Used when we don't have full HAR data for an activity type
    // ========================================================
    function buildMinimalAct(actId, brief) {
        var now = Date.now();
        return {
            _id: actId,
            _templateId: "",
            _templateName: brief.templateName,
            _name: brief.name,
            "__name": "",
            _des: "",
            "__des": "",
            _icon: brief.icon,
            _image: "",
            _displayIndex: brief.displayIndex,
            _showRed: brief.showRed,
            _activityType: brief.actType,
            _cycleType: brief.actCycle,
            _enable: true,
            _timeType: 2,
            _newUserUsing: true,
            _isloop: false,
            _loopInterval: 0,
            _startDay: 0,
            _durationDay: 7,
            _oldUserVip: 0,
            _oldUserServerOpenDay: 0,
            _oldUserServerOpenDayEnd: 0,
            _oldUserOfflineDay: 0,
            _startTime: 0,
            _endTime: 0,
            _loopCount: 0,
            _loopTag: "",
            _timestamp: now,
            _hideos: "",
            _limitReward: { _items: {} },
            __ruleDes: null,
            _displayAdvance: 0,
            _displayExtend: 0
        };
    }

    // ========================================================
    // Build fresh uact (user activity state)
    // Generates empty state with 0 progress for all tasks
    // ========================================================
    function buildUact(actId, act) {
        var activityType = act._activityType;
        var brief = BRIEF_DATA[actId];
        var cycleType = brief ? brief.actCycle : 1;
        var now = Date.now();

        // Calculate start/end times based on cycleType
        var startTime = now;
        var endTime = now + (7 * 24 * 60 * 60 * 1000); // default 7 days

        var uact = {
            _activityType: activityType,
            _startTime: startTime,
            _endTime: endTime,
            _activityId: actId,
            _loopTag: "",
            _haveClick: false,
            _gotRewards: { _items: {} }
        };

        // Type-specific uact structures
        if (activityType === 1002 && act._pages) {
            // Growth Quest: uact has _tasks mirroring act._pages
            var tasks = {};
            for (var pageKey in act._pages) {
                var page = act._pages[pageKey];
                var pageTasks = {};
                if (page._tasks) {
                    for (var taskKey in page._tasks) {
                        pageTasks[taskKey] = { _curCount: 0, _haveGotReward: false };
                    }
                }
                tasks[pageKey] = pageTasks;
            }
            uact._tasks = tasks;
        } else if (activityType === 2001 && act._items) {
            // Hero Grand Kickback: uact has _items with leftTimes/curCount
            var items = {};
            for (var itemKey in act._items) {
                items[itemKey] = { _leftTimes: 0, _curCount: 0 };
            }
            uact._items = items;
        } else if (activityType === 2002 && act._items) {
            // Orange Hero Assembly: uact has _items with curCount/haveGotReward
            var items2 = {};
            for (var itemKey2 in act._items) {
                items2[itemKey2] = { _curCount: 0, _haveGotReward: false };
            }
            uact._items = items2;
        }

        return uact;
    }

    // ========================================================
    // Load or create persisted uact
    // ========================================================
    function getOrCreateUact(actId, act) {
        var states = loadUactStates();
        if (states[actId]) {
            return states[actId];
        }
        var uact = buildUact(actId, act);
        states[actId] = uact;
        saveUactStates(states);
        return uact;
    }

    // ========================================================
    // MAIN HANDLER
    // ========================================================
    function handleGetActivityDetail(request, playerData) {
        LOG.info('Handling activity.getActivityDetail');

        var actId = request.actId;
        var act;
        var uact;

        // 1. Look up activity data
        if (KNOWN_ACTS[actId]) {
            // Full HAR data available
            act = KNOWN_ACTS[actId];
            LOG.info('Full HAR data for: ' + act._name + ' (type=' + act._activityType + ')');
        } else if (BRIEF_DATA[actId]) {
            // Build minimal act from brief data
            act = buildMinimalAct(actId, BRIEF_DATA[actId]);
            LOG.info('Minimal act for: ' + BRIEF_DATA[actId].name + ' (type=' + act._activityType + ')');
        } else {
            // Unknown actId - create absolute minimal
            LOG.warn('Unknown actId: ' + actId + ' - creating minimal response');
            act = {
                _id: actId,
                _templateId: "",
                _templateName: "",
                _name: "Unknown Activity",
                "__name": "",
                _des: "",
                "__des": "",
                _icon: "",
                _image: "",
                _displayIndex: 0,
                _showRed: false,
                _activityType: 0,
                _cycleType: request.cycleType,
                _enable: true,
                _timeType: 2,
                _newUserUsing: true,
                _isloop: false,
                _loopInterval: 0,
                _startDay: 0,
                _durationDay: 7,
                _oldUserVip: 0,
                _oldUserServerOpenDay: 0,
                _oldUserServerOpenDayEnd: 0,
                _oldUserOfflineDay: 0,
                _startTime: 0,
                _endTime: 0,
                _loopCount: 0,
                _loopTag: "",
                _timestamp: Date.now(),
                _hideos: "",
                _limitReward: { _items: {} },
                __ruleDes: null,
                _displayAdvance: 0,
                _displayExtend: 0
            };
        }

        // 2. Get or create uact
        uact = getOrCreateUact(actId, act);

        // 3. Build response using echo loop pattern
        var responseData = {};
        for (var key in request) {
            responseData[key] = request[key];
        }
        responseData.act = act;
        responseData.uact = uact;
        responseData.forceEndTime = 0;

        LOG.success('getActivityDetail \u2192 ' + (act._name || 'Unknown') + ' (type=' + act._activityType + ', cycle=' + (act._cycleType || request.cycleType) + ')');

        return responseData;
    }

    // ========================================================
    // REGISTER HANDLER
    // ========================================================
    function register() {
        if (typeof window === 'undefined') {
            console.error('[ACTIVITY] window not available');
            return;
        }

        window.MAIN_SERVER_HANDLERS = window.MAIN_SERVER_HANDLERS || {};
        window.MAIN_SERVER_HANDLERS['activity.getActivityDetail'] = handleGetActivityDetail;

        LOG.success('Handler registered: activity.getActivityDetail');
    }

    // Auto-register
    if (typeof window !== 'undefined') {
        register();
    } else {
        var _check = setInterval(function() {
            if (typeof window !== 'undefined') {
                clearInterval(_check);
                register();
            }
        }, 50);
        setTimeout(function() { clearInterval(_check); }, 10000);
    }

})(window);
