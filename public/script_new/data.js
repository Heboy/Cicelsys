/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-11
 * Time: 下午2:42
 * To change this template use File | Settings | File Templates.
 */
var classCourseReport = {
	basicInfo:function(){
		return {
			data:[{
				name: '成都七中',
				studentNum: 466,
				signNum: 466,
				realNum: 457
			}],
			tips:'说明：报考人数是指本校理科报名参加本次测试的总人数，而有效人数是指除去缺考、单科或总分为零的考生之后的总人数。本报告中所有指标均采用有效人数。'
		}
	},
	compareWithClass: function () {
		return [
			{
				name: '10',
				maxScore: 96.00,
				avgScore: 86.04,
				stdScore: 6.51,
				contribute: '13%'
			},
			{
				name: '10',
				maxScore: 97.00,
				avgScore: 86.04,
				stdScore: 6.51,
				contribute: '17%'
			},
			{
				name: '11',
				maxScore: 94.00,
				avgScore: 86.04,
				stdScore: 6.51,
				contribute: '17%'
			},
			{
				name: '12',
				maxScore: 91.00,
				avgScore: 86.04,
				stdScore: 6.51,
				contribute: '15%'
			},
			{
				name: '13',
				maxScore: 93.00,
				avgScore: 86.04,
				stdScore: 6.51,
				contribute: '12%'
			},
			{
				name: '14',
				maxScore: 88.00,
				avgScore: 86.04,
				stdScore: 6.51,
				contribute: '13%'
			},
			{
				name: '15',
				maxScore: 94.00,
				avgScore: 86.04,
				stdScore: 6.51,
				contribute: '14%'
			}
		]
	},

	compareWithSchool: function () {
		return [
			{
				name: 'A',
				maxScore: 98.00,
				avgScore: 79.41,
				stdScore: 11.35,
				adventage: '11.35%'
			},
			{
				name: 'B',
				maxScore: 95.00,
				avgScore: 78.41,
				stdScore: 9.35,
				adventage: '9.35%'
			},
			{
				name: '成都七中',
				maxScore: 97.00,
				avgScore: 74.41,
				stdScore: 13.35,
				adventage: '13.35%'
			},
			{
				name: 'C',
				maxScore: 88.00,
				avgScore: 75.41,
				stdScore: 13.35,
				adventage: '13.35%'
			},
			{
				name: 'D',
				maxScore: 92.00,
				avgScore: 76.41,
				stdScore: 9.35,
				adventage: '9.35%'
			},
			{
				name: '一级示范',
				maxScore: 99.00,
				avgScore: 66.41,
				stdScore: 16.35,
				adventage: '16.35%'
			}
		]
	},

	seg: function () {
		return [
			{
				name: 'A',
				'0-19': 0,
				'20-39': 3,
				'40-59': 15,
				'60-79': 81,
				'80-99': 161,
				'100-119': 0,
				'120-150': 0
			},
			{
				name: 'B',
				'0-19': 0,
				'20-39': 0,
				'40-59': 1,
				'60-79': 14,
				'80-99': 20,
				'100-119': 0,
				'120-150': 0
			},
			{
				name: '成都七中',
				'0-19': 0,
				'20-39': 11,
				'40-59': 49,
				'60-79': 203,
				'80-99': 194,
				'100-119': 0,
				'120-150': 0
			},
			{
				name: 'C',
				'0-19': 0,
				'20-39': 11,
				'40-59': 49,
				'60-79': 203,
				'80-99': 194,
				'100-119': 0,
				'120-150': 0
			},
			{
				name: 'D',
				'0-19': 0,
				'20-39': 0,
				'40-59': 2,
				'60-79': 18,
				'80-99': 16,
				'100-119': 0,
				'120-150': 0
			},
			{
				name: '一级示范',
				'0-19': 57,
				'20-39': 619,
				'40-59': 2535,
				'60-79': 4875,
				'80-99': 2776,
				'100-119': 0,
				'120-150': 0
			}
		]
	},
	seg2: function () {
		return [
			{
				name: '0-19',
				rateA: 0,
				rateB: 0,
				rateC: 0,
				rateD: 0,
				rate: 0
			},
			{
				name: '20-39',
				rateA: 3,
				rateB: 5,
				rateC: 3,
				rateD: 7,
				rate: 4
			},
			{
				name: '40-59',
				rateA: 9,
				rateB: 10,
				rateC: 10,
				rateD: 8,
				rate: 10
			},
			{
				name: '60-79',
				rateA: 18,
				rateB: 19,
				rateC: 22,
				rateD: 16,
				rate: 14
			},
			{
				name: '80-99',
				rateA: 25,
				rateB: 27,
				rateC: 33,
				rateD: 25,
				rate: 28
			},
			{
				name: '100-119',
				rateA: 15,
				rateB: 10,
				rateC: 8,
				rateD: 11,
				rate: 10
			},
			{
				name: '120-150',
				rateA: 0,
				rateB: 0,
				rateC: 0,
				rateD: 0,
				rate: 0
			}
		]
	},
	knowledge: function () {
		return [
			{
				name: '选修1',
				schoolA: 65,
				schoolB: 69,
				school: 75,
				schoolC: 77,
				schoolD: 66,
				rate: 18
			},
			{
				name: '选修2',
				schoolA: 88,
				schoolB: 82,
				school: 85,
				schoolC: 79,
				schoolD: 84,
				rate: 32
			},
			{
				name: '选修3',
				schoolA: 80,
				schoolB: 79,
				school: 85,
				schoolC: 89,
				schoolD: 77,
				rate: 20
			},
			{
				name: '选修4',
				schoolA: 84,
				schoolB: 86,
				school: 82,
				schoolC: 77,
				schoolD: 80,
				rate: 15
			},
			{
				name: '选修5',
				schoolA: 69,
				schoolB: 70,
				school: 75,
				schoolC: 79,
				schoolD: 73,
				rate: 15
			}
		]
	},
	ability: function () {
		return [
			{
				name: '自学应用能力',
				schoolA: 69,
				schoolB: 70,
				school: 75,
				schoolC: 79,
				schoolD: 73,
				rate: 15
			},
			{
				name: '图表阅读理解',
				schoolA: 84,
				schoolB: 86,
				school: 82,
				schoolC: 77,
				schoolD: 80,
				rate: 15
			},
			{
				name: '理解和运用',
				schoolA: 80,
				schoolB: 79,
				school: 85,
				schoolC: 89,
				schoolD: 77,
				rate: 20
			},
			{
				name: '基础知识运用',
				schoolA: 88,
				schoolB: 82,
				school: 85,
				schoolC: 79,
				schoolD: 84,
				rate: 32
			},
			{
				name: '获取信息实验表达',
				schoolA: 65,
				schoolB: 69,
				school: 75,
				schoolC: 77,
				schoolD: 66,
				rate: 18
			},
			{
				name: '分析推理',
				schoolA: 65,
				schoolB: 76,
				school: 75,
				schoolC: 80,
				schoolD: 66,
				rate: 18
			}
		]
	}
}
