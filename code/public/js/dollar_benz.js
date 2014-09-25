/**
 * The $1 Unistroke Recognizer (JavaScript version)
 *
 *	Jacob O. Wobbrock, Ph.D.
 * 	The Information School
 *	University of Washington
 *	Seattle, WA 98195-2840
 *	wobbrock@uw.edu
 *
 *	Andrew D. Wilson, Ph.D.
 *	Microsoft Research
 *	One Microsoft Way
 *	Redmond, WA 98052
 *	awilson@microsoft.com
 *
 *	Yang Li, Ph.D.
 *	Department of Computer Science and Engineering
 * 	University of Washington
 *	Seattle, WA 98195-2840
 * 	yangli@cs.washington.edu
 *
 * The academic publication for the $1 recognizer, and what should be 
 * used to cite it, is:
 *
 *	Wobbrock, J.O., Wilson, A.D. and Li, Y. (2007). Gestures without 
 *	  libraries, toolkits or training: A $1 recognizer for user interface 
 *	  prototypes. Proceedings of the ACM Symposium on User Interface 
 *	  Software and Technology (UIST '07). Newport, Rhode Island (October 
 *	  7-10, 2007). New York: ACM Press, pp. 159-168.
 *
 * The Protractor enhancement was separately published by Yang Li and programmed 
 * here by Jacob O. Wobbrock:
 *
 *	Li, Y. (2010). Protractor: A fast and accurate gesture
 *	  recognizer. Proceedings of the ACM Conference on Human
 *	  Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *	  (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (C) 2007-2012, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University of Washington nor Microsoft,
 *      nor the names of its contributors may be used to endorse or promote
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
 * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
//
// Point class
//
function Point(x, y) // constructor
{
	this.X = x;
	this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) // constructor
{
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}
//
// Unistroke class: a unistroke template
//
function Unistroke(name, points) // constructor
{
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	var radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleTo(this.Points, SquareSize);
	this.Points = TranslateTo(this.Points, Origin);
	this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score) // constructor
{
	this.Name = name;
	this.Score = score;
}
//
// DollarRecognizer class constants
//
var NumUnistrokes = 5;
var NumPoints = 64;
var SquareSize = 250.0;
var Origin = new Point(0,0);
var Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
var HalfDiagonal = 0.5 * Diagonal;
var AngleRange = Deg2Rad(45.0);
var AnglePrecision = Deg2Rad(2.0);
var Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
function DollarRecognizer() // constructor
{
	// gesture data for benz
	var benz_e=new Array(new Point(1,223),new Point(3,221),new Point(12,223),new Point(24,225),new Point(38,224),new Point(61,225),new Point(87,224),new Point(108,224),new Point(123,225),new Point(144,223),new Point(168,223),new Point(194,225),new Point(220,225),new Point(241,225),new Point(259,225),new Point(277,227),new Point(295,228),new Point(317,232),new Point(346,236),new Point(370,238),new Point(388,240),new Point(408,245),new Point(432,247),new Point(458,250),new Point(479,256),new Point(506,260),new Point(539,262),new Point(566,264),new Point(591,268),new Point(617,270),new Point(652,273),new Point(686,275),new Point(717,278),new Point(742,278),new Point(770,276),new Point(786,275),new Point(800,274),new Point(816,274),new Point(842,267),new Point(862,265),new Point(882,261),new Point(898,256),new Point(914,249),new Point(919,244),new Point(914,236),new Point(902,225),new Point(886,215),new Point(878,206),new Point(872,199),new Point(855,189),new Point(832,180),new Point(818,173),new Point(802,165),new Point(789,156),new Point(774,150),new Point(757,147),new Point(733,143),new Point(704,139),new Point(672,137),new Point(642,134),new Point(616,132),new Point(595,128),new Point(579,125),new Point(567,124),new Point(555,123),new Point(538,122),new Point(518,121),new Point(494,121),new Point(465,123),new Point(435,128),new Point(402,134),new Point(369,140),new Point(340,148),new Point(316,155),new Point(298,160),new Point(283,169),new Point(267,175),new Point(249,184),new Point(239,192),new Point(232,201),new Point(225,212),new Point(214,221),new Point(209,227),new Point(206,233),new Point(200,241),new Point(197,248),new Point(197,257),new Point(204,273),new Point(225,287),new Point(252,291),new Point(275,301),new Point(299,312),new Point(332,320),new Point(366,325),new Point(400,334),new Point(430,348),new Point(452,363),new Point(470,378),new Point(493,390),new Point(517,405),new Point(533,419),new Point(540,423),new Point(546,432),new Point(551,438),new Point(553,449),new Point(538,462),new Point(521,471),new Point(503,481),new Point(481,492),new Point(468,502),new Point(456,514),new Point(452,523),new Point(465,525),new Point(494,526),new Point(524,524),new Point(550,522),new Point(584,513),new Point(621,505),new Point(658,494),new Point(690,481),new Point(717,464),new Point(746,451),new Point(778,437),new Point(806,422),new Point(826,409),new Point(847,396),new Point(872,380),new Point(893,364),new Point(907,350),new Point(921,334),new Point(932,323),new Point(945,311),new Point(966,300),new Point(985,287),new Point(1007,272),new Point(1035,257),new Point(1066,246),new Point(1089,239),new Point(1118,232),new Point(1156,227));
	
	var benz_eee3=new Array(new Point(1,348),new Point(6,343),new Point(22,340),new Point(49,335),new Point(87,324),new Point(115,315),new Point(135,311),new Point(154,310),new Point(174,304),new Point(190,295),new Point(194,284),new Point(196,270),new Point(205,255),new Point(215,246),new Point(228,236),new Point(242,228),new Point(265,220),new Point(299,213),new Point(324,212),new Point(344,217),new Point(364,222),new Point(374,232),new Point(380,245),new Point(384,261),new Point(387,286),new Point(386,311),new Point(382,329),new Point(374,350),new Point(360,375),new Point(350,395),new Point(340,409),new Point(329,418),new Point(317,426),new Point(301,430),new Point(285,432),new Point(263,431),new Point(244,429),new Point(228,425),new Point(210,417),new Point(202,406),new Point(203,386),new Point(203,363),new Point(211,346),new Point(223,334),new Point(237,330),new Point(260,326),new Point(282,326),new Point(302,328),new Point(321,329),new Point(336,329),new Point(344,330),new Point(362,330),new Point(374,330),new Point(387,327),new Point(410,321),new Point(433,314),new Point(451,302),new Point(462,287),new Point(478,273),new Point(503,257),new Point(528,238),new Point(552,231),new Point(576,226),new Point(604,223),new Point(627,224),new Point(642,230),new Point(656,235),new Point(668,247),new Point(676,260),new Point(675,281),new Point(671,304),new Point(663,321),new Point(658,333),new Point(654,345),new Point(650,363),new Point(640,384),new Point(631,396),new Point(624,405),new Point(612,414),new Point(591,425),new Point(567,434),new Point(551,434),new Point(534,434),new Point(519,427),new Point(507,415),new Point(494,401),new Point(491,381),new Point(494,363),new Point(503,342),new Point(517,326),new Point(537,319),new Point(555,319),new Point(570,318),new Point(594,320),new Point(628,321),new Point(662,316),new Point(689,312),new Point(718,303),new Point(741,286),new Point(759,265),new Point(777,250),new Point(801,240),new Point(825,232),new Point(846,223),new Point(870,218),new Point(892,215),new Point(911,220),new Point(924,228),new Point(940,239),new Point(951,252),new Point(958,268),new Point(963,285),new Point(962,302),new Point(953,319),new Point(946,335),new Point(937,350),new Point(925,369),new Point(912,389),new Point(898,407),new Point(888,420),new Point(874,429),new Point(852,439),new Point(831,442),new Point(812,441),new Point(799,436),new Point(787,428),new Point(777,420),new Point(771,412),new Point(769,401),new Point(766,386),new Point(763,370),new Point(766,356),new Point(771,344),new Point(779,335),new Point(793,327),new Point(809,323),new Point(831,319),new Point(853,317),new Point(876,314),new Point(896,313),new Point(919,313),new Point(949,313),new Point(976,310),new Point(1002,308),new Point(1034,304),new Point(1072,299),new Point(1108,291),new Point(1157,280));
	
	var benz_o=new Array(new Point(9,520),new Point(10,515),new Point(18,515),new Point(29,514),new Point(41,517),new Point(54,519),new Point(69,522),new Point(88,522),new Point(109,520),new Point(129,517),new Point(154,517),new Point(178,516),new Point(192,517),new Point(204,517),new Point(221,515),new Point(242,514),new Point(261,513),new Point(278,512),new Point(297,510),new Point(317,509),new Point(337,507),new Point(357,504),new Point(375,503),new Point(395,499),new Point(416,495),new Point(437,492),new Point(458,488),new Point(480,482),new Point(504,475),new Point(527,470),new Point(546,465),new Point(566,458),new Point(587,451),new Point(610,447),new Point(631,443),new Point(655,438),new Point(675,435),new Point(692,434),new Point(707,433),new Point(720,431),new Point(734,431),new Point(748,430),new Point(765,428),new Point(783,423),new Point(802,420),new Point(812,416),new Point(820,414),new Point(827,411),new Point(832,407),new Point(839,403),new Point(840,397),new Point(842,388),new Point(839,376),new Point(837,362),new Point(837,349),new Point(838,341),new Point(838,333),new Point(840,324),new Point(841,316),new Point(844,307),new Point(845,298),new Point(846,285),new Point(846,270),new Point(845,258),new Point(844,245),new Point(842,235),new Point(841,226),new Point(841,218),new Point(840,209),new Point(839,198),new Point(837,186),new Point(836,172),new Point(834,163),new Point(832,157),new Point(832,148),new Point(828,141),new Point(826,135),new Point(823,129),new Point(817,126),new Point(805,121),new Point(787,117),new Point(764,114),new Point(735,113),new Point(713,111),new Point(693,111),new Point(677,112),new Point(664,113),new Point(648,116),new Point(620,121),new Point(591,125),new Point(568,128),new Point(547,130),new Point(529,131),new Point(515,131),new Point(498,132),new Point(480,132),new Point(465,131),new Point(457,131),new Point(444,133),new Point(429,134),new Point(422,135),new Point(411,138),new Point(395,140),new Point(384,145),new Point(376,151),new Point(371,158),new Point(366,168),new Point(364,183),new Point(362,198),new Point(365,211),new Point(368,222),new Point(373,230),new Point(375,239),new Point(374,247),new Point(373,258),new Point(374,271),new Point(375,286),new Point(377,299),new Point(377,313),new Point(377,328),new Point(377,346),new Point(376,370),new Point(376,387),new Point(376,402),new Point(377,418),new Point(381,430),new Point(382,437),new Point(384,447),new Point(385,456),new Point(385,469),new Point(386,479),new Point(389,490),new Point(393,499),new Point(401,503),new Point(408,508),new Point(417,514),new Point(430,519),new Point(443,520),new Point(458,519),new Point(477,518),new Point(494,514),new Point(509,512),new Point(524,511),new Point(546,509),new Point(570,508),new Point(593,503),new Point(617,500),new Point(641,496),new Point(667,493),new Point(686,491),new Point(704,489),new Point(726,485),new Point(752,479),new Point(776,475),new Point(798,470),new Point(823,466),new Point(853,460),new Point(877,458),new Point(893,455),new Point(912,450),new Point(935,442),new Point(961,433),new Point(981,425),new Point(995,415),new Point(1008,407),new Point(1024,394),new Point(1041,378),new Point(1057,366),new Point(1069,356),new Point(1076,347),new Point(1088,336),new Point(1105,322),new Point(1126,308),new Point(1149,288));
	
	var benz_v=new Array(new Point(4,256),new Point(7,255),new Point(25,251),new Point(53,246),new Point(93,240),new Point(120,232),new Point(144,228),new Point(175,222),new Point(206,218),new Point(237,210),new Point(262,203),new Point(291,198),new Point(317,194),new Point(328,190),new Point(343,190),new Point(350,186),new Point(346,179),new Point(335,169),new Point(325,159),new Point(314,150),new Point(299,142),new Point(279,137),new Point(259,132),new Point(240,130),new Point(225,127),new Point(208,126),new Point(198,127),new Point(189,127),new Point(192,131),new Point(199,136),new Point(205,144),new Point(211,152),new Point(216,164),new Point(222,174),new Point(227,188),new Point(231,200),new Point(237,210),new Point(244,218),new Point(253,224),new Point(267,231),new Point(280,237),new Point(295,241),new Point(302,246),new Point(310,252),new Point(318,258),new Point(322,267),new Point(329,273),new Point(339,278),new Point(346,280),new Point(351,284),new Point(357,287),new Point(367,295),new Point(381,300),new Point(399,308),new Point(414,317),new Point(425,325),new Point(433,335),new Point(442,346),new Point(453,356),new Point(463,373),new Point(470,390),new Point(480,402),new Point(490,414),new Point(498,427),new Point(508,438),new Point(519,451),new Point(532,468),new Point(540,480),new Point(543,491),new Point(546,498),new Point(547,504),new Point(550,504),new Point(556,499),new Point(567,490),new Point(585,478),new Point(615,462),new Point(645,438),new Point(665,426),new Point(685,419),new Point(711,414),new Point(731,406),new Point(748,403),new Point(766,399),new Point(780,399),new Point(793,400),new Point(804,404),new Point(814,407),new Point(826,413),new Point(836,419),new Point(848,432),new Point(862,442),new Point(874,455),new Point(884,469),new Point(888,482),new Point(892,492),new Point(902,501),new Point(913,508),new Point(926,514),new Point(940,521),new Point(952,524),new Point(963,526),new Point(980,528),new Point(1000,529),new Point(1025,530),new Point(1055,530),new Point(1089,530),new Point(1144,528));
	var benz_z=new Array(new Point(0,246),new Point(9,248),new Point(20,250),new Point(35,252),new Point(54,255),new Point(83,260),new Point(109,260),new Point(125,260),new Point(138,262),new Point(154,263),new Point(176,263),new Point(198,263),new Point(220,262),new Point(255,263),new Point(287,262),new Point(313,261),new Point(340,260),new Point(364,260),new Point(386,260),new Point(409,258),new Point(439,256),new Point(471,255),new Point(502,254),new Point(529,253),new Point(561,252),new Point(602,249),new Point(649,245),new Point(680,243),new Point(698,241),new Point(720,238),new Point(750,236),new Point(774,234),new Point(777,235),new Point(770,239),new Point(759,244),new Point(728,253),new Point(699,258),new Point(680,262),new Point(662,267),new Point(640,272),new Point(620,281),new Point(602,287),new Point(582,295),new Point(563,304),new Point(541,312),new Point(510,320),new Point(480,328),new Point(458,336),new Point(436,347),new Point(410,356),new Point(382,369),new Point(353,383),new Point(334,394),new Point(317,401),new Point(293,409),new Point(265,419),new Point(247,429),new Point(236,440),new Point(222,452),new Point(205,468),new Point(191,482),new Point(180,494),new Point(177,501),new Point(171,508),new Point(162,515),new Point(156,519),new Point(166,517),new Point(192,515),new Point(213,516),new Point(232,516),new Point(252,517),new Point(274,516),new Point(302,514),new Point(332,513),new Point(357,513),new Point(386,510),new Point(420,506),new Point(452,502),new Point(473,497),new Point(495,488),new Point(514,482),new Point(533,475),new Point(550,464),new Point(564,452),new Point(574,442),new Point(586,431),new Point(594,417),new Point(601,406),new Point(610,396),new Point(619,384),new Point(625,373),new Point(627,373),new Point(622,382),new Point(622,392),new Point(619,403),new Point(616,414),new Point(613,427),new Point(609,442),new Point(605,457),new Point(598,469),new Point(590,481),new Point(597,480),new Point(614,480),new Point(638,480),new Point(656,478),new Point(668,476),new Point(684,471),new Point(704,466),new Point(726,458),new Point(746,451),new Point(763,445),new Point(778,439),new Point(790,432),new Point(801,426),new Point(815,418),new Point(825,409),new Point(834,400),new Point(841,390),new Point(851,375),new Point(857,361),new Point(861,353),new Point(867,343),new Point(871,329),new Point(876,318),new Point(881,307),new Point(886,296),new Point(893,283),new Point(901,270),new Point(909,256),new Point(919,245),new Point(930,234),new Point(940,225),new Point(953,215),new Point(962,205),new Point(972,193),new Point(982,179),new Point(987,171),new Point(993,167),new Point(1001,162),new Point(1016,158),new Point(1034,153),new Point(1063,147),new Point(1085,143),new Point(1104,140),new Point(1119,140));
	//
	// one built-in unistroke per gesture type
	//
	this.Unistrokes = new Array(NumUnistrokes);
	this.Unistrokes[0] = new Unistroke("benz_e", benz_e);
	this.Unistrokes[1] = new Unistroke("benz_eee3", benz_eee3);
	this.Unistrokes[2] = new Unistroke("benz_o", benz_o);
	this.Unistrokes[3] = new Unistroke("benz_v", benz_v);
	this.Unistrokes[4] = new Unistroke("benz_z", benz_z);
	
	//
	// The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
	//
	this.Recognize = function(points, useProtractor)
	{
		points = Resample(points, NumPoints);
		var radians = IndicativeAngle(points);
		points = RotateBy(points, -radians);
		points = ScaleTo(points, SquareSize);
		points = TranslateTo(points, Origin);
		var vector = Vectorize(points); // for Protractor

		var b = +Infinity;
		var u = -1;
		for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke
		{
			var d;
			if (useProtractor) // for Protractor
				d = OptimalCosineDistance(this.Unistrokes[i].Vector, vector);
			else // Golden Section Search (original $1)
				d = DistanceAtBestAngle(points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision);
			if (d < b) {
				b = d; // best (least) distance
				u = i; // unistroke
			}
		}
		return (u == -1) ? new Result("No match.", 0.0) : new Result(this.Unistrokes[u].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
	};
	this.AddGesture = function(name, points)
	{
		this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
		var num = 0;
		for (var i = 0; i < this.Unistrokes.length; i++) {
			if (this.Unistrokes[i].Name == name)
				num++;
		}
		return num;
	}
	this.DeleteUserGestures = function()
	{
		this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
		return NumUnistrokes;
	}
}
//
// Private helper functions from this point down
//
function Resample(points, n)
{
	var I = PathLength(points) / (n - 1); // interval length
	var D = 0.0;
	var newpoints = new Array(points[0]);
	for (var i = 1; i < points.length; i++)
	{
		var d = Distance(points[i - 1], points[i]);
		if ((D + d) >= I)
		{
			var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
			var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
			var q = new Point(qx, qy);
			newpoints[newpoints.length] = q; // append new point 'q'
			points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
			D = 0.0;
		}
		else D += d;
	}
	if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
		newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
	return newpoints;
}
function IndicativeAngle(points)
{
	var c = Centroid(points);
	return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) // rotates points around centroid
{
	var c = Centroid(points);
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
		var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
	var B = BoundingBox(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X * (size / B.Width);
		var qy = points[i].Y * (size / B.Height);
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
	var c = Centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X + pt.X - c.X;
		var qy = points[i].Y + pt.Y - c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function Vectorize(points) // for Protractor
{
	var sum = 0.0;
	var vector = new Array();
	for (var i = 0; i < points.length; i++) {
		vector[vector.length] = points[i].X;
		vector[vector.length] = points[i].Y;
		sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
	}
	var magnitude = Math.sqrt(sum);
	for (var i = 0; i < vector.length; i++)
		vector[i] /= magnitude;
	return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
	var a = 0.0;
	var b = 0.0;
	for (var i = 0; i < v1.length; i += 2) {
		a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
                b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
	}
	var angle = Math.atan(b / a);
	return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold)
{
	var x1 = Phi * a + (1.0 - Phi) * b;
	var f1 = DistanceAtAngle(points, T, x1);
	var x2 = (1.0 - Phi) * a + Phi * b;
	var f2 = DistanceAtAngle(points, T, x2);
	while (Math.abs(b - a) > threshold)
	{
		if (f1 < f2) {
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = Phi * a + (1.0 - Phi) * b;
			f1 = DistanceAtAngle(points, T, x1);
		} else {
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - Phi) * a + Phi * b;
			f2 = DistanceAtAngle(points, T, x2);
		}
	}
	return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians)
{
	var newpoints = RotateBy(points, radians);
	return PathDistance(newpoints, T.Points);
}
function Centroid(points)
{
	var x = 0.0, y = 0.0;
	for (var i = 0; i < points.length; i++) {
		x += points[i].X;
		y += points[i].Y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}
function BoundingBox(points)
{
	var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
	for (var i = 0; i < points.length; i++) {
		minX = Math.min(minX, points[i].X);
		minY = Math.min(minY, points[i].Y);
		maxX = Math.max(maxX, points[i].X);
		maxY = Math.max(maxY, points[i].Y);
	}
	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2)
{
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
		d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}
function PathLength(points)
{
	var d = 0.0;
	for (var i = 1; i < points.length; i++)
		d += Distance(points[i - 1], points[i]);
	return d;
}
function Distance(p1, p2)
{
	var dx = p2.X - p1.X;
	var dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }