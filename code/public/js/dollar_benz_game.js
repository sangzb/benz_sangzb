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
	var benz_e=new Array(new Point(16,60),new Point(18,60),new Point(20,60),new Point(21,60),new Point(24,60),new Point(26,60),new Point(29,60),new Point(32,60),new Point(34,60),new Point(35,60),new Point(35.24051542699581,60),new Point(37,60),new Point(38,60),new Point(39,60),new Point(41,60),new Point(42,60),new Point(42,60),new Point(43,60),new Point(44,60),new Point(46,60),new Point(48,60),new Point(49,60),new Point(51,60),new Point(53,60),new Point(55.481030853991626,60),new Point(56,60),new Point(58,60),new Point(61,60),new Point(63,60),new Point(66,61),new Point(69,62),new Point(72,62),new Point(74,63),new Point(75.03836108278689,63.519180541393446),new Point(76,64),new Point(77,64),new Point(80,64),new Point(81,64),new Point(83,64),new Point(85,65),new Point(87,66),new Point(89,66),new Point(90,66),new Point(93,66),new Point(94,66),new Point(94.49019080009674,66.49019080009674),new Point(95,67),new Point(96,67),new Point(98,67),new Point(99,68),new Point(102,68),new Point(104,68),new Point(107,69),new Point(109,69),new Point(111,70),new Point(113,71),new Point(113.470909164729,71),new Point(114,71),new Point(115,71),new Point(117,71),new Point(118,71),new Point(120,72),new Point(121,73),new Point(122,73),new Point(124,73),new Point(127,74),new Point(129,75),new Point(131,75),new Point(132.4872512203703,75.74362561018515),new Point(133,76),new Point(136,76),new Point(138,76),new Point(141,77),new Point(144,78),new Point(147,79),new Point(150,79),new Point(152.11531023568963,79.5288275589224),new Point(154,80),new Point(157,80),new Point(160,81),new Point(163,82),new Point(165,82),new Point(167,83),new Point(171.73719838671624,83),new Point(173,83),new Point(175,84),new Point(177,85),new Point(180,86),new Point(182,86),new Point(184,86),new Point(186,86),new Point(190.96112968675078,87.98445187470031),new Point(191,88),new Point(193,88),new Point(195,89),new Point(198,90),new Point(200,90),new Point(203,90),new Point(205,90),new Point(206,91),new Point(208,91),new Point(210,92),new Point(210.10608273379347,92.10608273379349),new Point(211,93),new Point(214,94),new Point(217,95),new Point(219,95),new Point(221,96),new Point(224,97),new Point(227,97),new Point(229.13778623161335,97.71259541053777),new Point(230,98),new Point(233,99),new Point(235,99),new Point(238,100),new Point(241,101),new Point(244,102),new Point(247,103),new Point(248,104),new Point(248.09486335134872,104.04743167567436),new Point(250,105),new Point(252,105),new Point(253,106),new Point(255,107),new Point(256,107),new Point(257,108),new Point(260,109),new Point(262,109),new Point(265,110),new Point(266.7214574780079,110),new Point(267,110),new Point(274,112),new Point(277,113),new Point(280,113),new Point(282,114),new Point(285,114),new Point(286.2176514993184,114.40588383310613),new Point(288,115),new Point(294,118),new Point(296,118),new Point(299,119),new Point(305.24151497114195,120.78328999175484),new Point(306,121),new Point(310,122),new Point(313,122),new Point(318,123),new Point(324.95138925437817,124.98611121553662),new Point(325,125),new Point(330,126),new Point(333,127),new Point(338,128),new Point(342,128),new Point(344.801203458172,128.400171922596),new Point(349,129),new Point(360,131),new Point(364.64895617367176,132.26789713827412),new Point(371,134),new Point(377,135),new Point(381,136),new Point(384.3846149633273,136.67692299266545),new Point(386,137),new Point(389,137),new Point(393,138),new Point(397,139),new Point(404,141),new Point(404.066818321688,141),new Point(406,141),new Point(409,141),new Point(410,141),new Point(413,141),new Point(415,142),new Point(416,142),new Point(417,142),new Point(419,143),new Point(422,143),new Point(423.83519779368424,143),new Point(425,143),new Point(427,143),new Point(428,143),new Point(432,143),new Point(433,143),new Point(435,143),new Point(436,143),new Point(437,143),new Point(438,143),new Point(439,143),new Point(440,143),new Point(440,142),new Point(441,142),new Point(441,141),new Point(441,140),new Point(441,139.92428677931994),new Point(441,139),new Point(441,137),new Point(441,135),new Point(441,134),new Point(441,133),new Point(441,132),new Point(442,128),new Point(442,127),new Point(442,125),new Point(442,123),new Point(442,122),new Point(442,121),new Point(442,119.8068769779418),new Point(442,119),new Point(442,118),new Point(442,116),new Point(441,115),new Point(441,113),new Point(440,113),new Point(440,111),new Point(440,110),new Point(439,108),new Point(439,107),new Point(438,107),new Point(435.12998585449134,103.1733144726551),new Point(435,103),new Point(434,103),new Point(433,101),new Point(429,99),new Point(426,97),new Point(424,96),new Point(419,94),new Point(418.0260722352486,93.5130361176243),new Point(413,91),new Point(411,90),new Point(408,89),new Point(405,88),new Point(399.0571196834184,86.81142393668368),new Point(395,86),new Point(392,85),new Point(389,84),new Point(385,83),new Point(381,83),new Point(379.3940377526981,82.59850943817453),new Point(373,81),new Point(370,81),new Point(368,81),new Point(362,81),new Point(359.4522575248076,80.27207357851645),new Point(355,79),new Point(351,79),new Point(339.5615952638963,77.01071221980806),new Point(328,75),new Point(319.7485712499205,72.93714281248012),new Point(316,72),new Point(311,71),new Point(299.87588618978407,69.14598103163067),new Point(299,69),new Point(292,67),new Point(286,66),new Point(280.10693893907944,64.92853435255991),new Point(275,64),new Point(261,61),new Point(260.26797046569976,61),new Point(258,61),new Point(254,60),new Point(250,60),new Point(245,60),new Point(240.1505606643216,60),new Point(238,60),new Point(237,60),new Point(234,60),new Point(232,60),new Point(227,60),new Point(223,60),new Point(219.9100452373258,60),new Point(217,60),new Point(215,60),new Point(213,60),new Point(210,61),new Point(210,62),new Point(207,64),new Point(206,64),new Point(205,66),new Point(203.0641740204581,67.29055065302792),new Point(202,68),new Point(200,70),new Point(196,74),new Point(195,74),new Point(194,76),new Point(193,77),new Point(189.360542573952,81.54932178256),new Point(189,82),new Point(188,85),new Point(187,87),new Point(186,90),new Point(183,92),new Point(183,98),new Point(183,99.49719113022066),new Point(183,100),new Point(183,102),new Point(183,103),new Point(183,105),new Point(183,108),new Point(185,116),new Point(186,116),new Point(187,118),new Point(187.1142305739591,118.2284611479182),new Point(188,120),new Point(188,121),new Point(189,123),new Point(193,126),new Point(196,128),new Point(199,130),new Point(201.66836554390343,130.88945518130114),new Point(202,131),new Point(206,133),new Point(210,135),new Point(219,138),new Point(220.41625003909917,138.3540625097748),new Point(227,140),new Point(230,141),new Point(238,142),new Point(240.1992697055596,142.3665449509266),new Point(244,143),new Point(246,144),new Point(248,145),new Point(259,148),new Point(259.51346858387296,148),new Point(261,148),new Point(264,148),new Point(265,149),new Point(268,150),new Point(271,151),new Point(274,152),new Point(277,154),new Point(278.14652881937394,154.4913694940174),new Point(284,157),new Point(289,159),new Point(291,160),new Point(295,161),new Point(296,162),new Point(296.50457481106037,162.50457481106037),new Point(297,163),new Point(298,163),new Point(299,166),new Point(299,167),new Point(300,169),new Point(301,170),new Point(301,171),new Point(301,173),new Point(301,175),new Point(301,176),new Point(301,179),new Point(301,180.72731920561486),new Point(301,183),new Point(301,185),new Point(301,187),new Point(300,189),new Point(299,191),new Point(297,196),new Point(294.88514777109873,199.52475371483547),new Point(294,201),new Point(294,202),new Point(293,204),new Point(290,206),new Point(288,207),new Point(285,210),new Point(284,214),new Point(284,215),new Point(284,215.07666385942656),new Point(284,216),new Point(284,219),new Point(284,220),new Point(284,222),new Point(284,223),new Point(284,224),new Point(286,226),new Point(291,228),new Point(294.07962107036,228.384952633795),new Point(299,229),new Point(303,229),new Point(305,229),new Point(311,229),new Point(314.28184503323894,229),new Point(322,229),new Point(325,229),new Point(327,229),new Point(334.5223604602347,229),new Point(335,229),new Point(341,225),new Point(344,224),new Point(347,224),new Point(353.19872130991257,222.45031967252186),new Point(359,221),new Point(365,218),new Point(367,216),new Point(369,215),new Point(371.2253305503829,213.88733472480854),new Point(377,211),new Point(380,210),new Point(381,209),new Point(387,205),new Point(388.83520626877004,204.21348302766998),new Point(394,202),new Point(407,197),new Point(407.38440666963885,196.42338999554173),new Point(409,194),new Point(413,191),new Point(414,189),new Point(416,188),new Point(421.9121124499555,182.82690160628894),new Point(424,181),new Point(429,178),new Point(434,176),new Point(439.00006407025614,172.2499519473079),new Point(442,170),new Point(444,168),new Point(446,168),new Point(450,165),new Point(456.0879664136986,162.29423714946728),new Point(459,161),new Point(463,160),new Point(469,158),new Point(475.4089214967181,156.39776962582047),new Point(485,154),new Point(489,152),new Point(491,151),new Point(494,149),new Point(494.03622679299957,148.98188660350021),new Point(496,148),new Point(496,147),new Point(499,144),new Point(502,143),new Point(505,142),new Point(508,141),new Point(511,140),new Point(511.13702526857116,139.93148736571442),new Point(513,139),new Point(514,139),new Point(515,139),new Point(517,139),new Point(518,139),new Point(524,139),new Point(530.8411281399485,141.10496250459954),new Point(537,143),new Point(543,145),new Point(545,146),new Point(546,146),new Point(547,146),new Point(547,147),new Point(549,148));
	
	
	var benz_eee3=new Array(new Point(34,144),new Point(36,144),new Point(38,143),new Point(40,142),new Point(43,141),new Point(46,141),new Point(49,141),new Point(52,140),new Point(54,139),new Point(54.35524555852265,138.82237722073867),new Point(56,138),new Point(58,138),new Point(60,138),new Point(60,137),new Point(61,137),new Point(61,136),new Point(62,136),new Point(63,135),new Point(64,135),new Point(65,135),new Point(65,134),new Point(66,133),new Point(67,133),new Point(68,132),new Point(69,132),new Point(69,131),new Point(71,130),new Point(71.07943342594614,129.92056657405388),new Point(72,129),new Point(73,128),new Point(74,127),new Point(74,126),new Point(75,125),new Point(75,124),new Point(76,123),new Point(76,122),new Point(77,122),new Point(77,121),new Point(78,120),new Point(79,118),new Point(80,116),new Point(81,115),new Point(82,114),new Point(83,113),new Point(83.34221367353823,113),new Point(84,113),new Point(84,111),new Point(85,111),new Point(85,110),new Point(86,108),new Point(87,108),new Point(88,107),new Point(90,105),new Point(91,105),new Point(93,104),new Point(94,103),new Point(94,103),new Point(96,102),new Point(98,101),new Point(99.04739514849001,100.476302425755),new Point(100,100),new Point(102,99),new Point(104,99),new Point(105,98),new Point(106,97),new Point(108,97),new Point(110,96),new Point(110,95),new Point(111,95),new Point(112,94),new Point(113,94),new Point(114,93),new Point(115,92),new Point(116,92),new Point(117.62936682716818,91.18531658641591),new Point(118,91),new Point(120,91),new Point(121,90),new Point(124,90),new Point(125,90),new Point(126,90),new Point(128,90),new Point(129,89),new Point(131,89),new Point(133,88),new Point(134,88),new Point(136,87),new Point(137,87),new Point(138,87),new Point(138,86.28500770271307),new Point(138,86),new Point(139,86),new Point(141,86),new Point(142,86),new Point(144,86),new Point(145,86),new Point(146,86),new Point(148,86),new Point(149,86),new Point(150,86),new Point(152,86),new Point(153,86),new Point(155,86),new Point(156,86),new Point(157,86),new Point(159,86),new Point(160,86),new Point(160.1449281589038,86),new Point(161,86),new Point(162,86),new Point(164,86),new Point(165,86),new Point(166,86),new Point(168,86),new Point(169,86),new Point(171,86),new Point(173,86),new Point(174,86),new Point(175,86),new Point(176,86),new Point(177,86),new Point(178,86),new Point(179,86),new Point(179,87),new Point(180,88),new Point(181,88),new Point(181.11359702835688,88.11359702835689),new Point(182,89),new Point(183,90),new Point(184,91),new Point(184,92),new Point(185,93),new Point(185,94),new Point(186,94),new Point(186,96),new Point(187,97),new Point(187,98),new Point(188,101),new Point(189,103),new Point(190,105),new Point(190,106.88510489273104),new Point(190,108),new Point(190,110),new Point(190,113),new Point(190,114),new Point(190,116),new Point(190,117),new Point(190,119),new Point(190,121),new Point(190,124),new Point(190,128),new Point(190,129.31504075434793),new Point(190,130),new Point(190,132),new Point(190,134),new Point(190,138),new Point(190,140),new Point(190,141),new Point(189,143),new Point(186,148),new Point(186,148),new Point(186,149),new Point(184.8135054080488,150.1864945919512),new Point(184,151),new Point(183,153),new Point(178,158),new Point(177,159),new Point(175,161),new Point(174,162),new Point(171,167),new Point(170.78331448253678,167.43337103492644),new Point(170,169),new Point(169,170),new Point(167,173),new Point(166,173),new Point(166,175),new Point(164,177),new Point(163,179),new Point(162,179),new Point(161,180),new Point(160,181),new Point(157.33724490680436,183.66275509319564),new Point(157,184),new Point(156,185),new Point(153,187),new Point(151,187),new Point(150,188),new Point(149,189),new Point(146,190),new Point(145,190),new Point(140,191),new Point(139,191),new Point(139,192),new Point(138.15648959577152,192),new Point(137,192),new Point(136,192),new Point(133,192),new Point(131,192),new Point(131,191),new Point(129,191),new Point(128,190),new Point(125,187),new Point(124,186),new Point(121,183),new Point(120.32136291689203,182.32136291689204),new Point(120,182),new Point(120,180),new Point(119,179),new Point(118,177),new Point(117,172),new Point(117,170),new Point(116,169),new Point(115,164),new Point(115,162),new Point(115,161.28707406332717),new Point(115,161),new Point(115,160),new Point(115,156),new Point(115,152),new Point(116,149),new Point(117,147),new Point(119,143),new Point(120,142),new Point(120.83099738556541,140.33800522886918),new Point(121,140),new Point(122,139),new Point(125,135),new Point(127,134),new Point(129,133),new Point(131,131),new Point(133,131),new Point(134,130),new Point(136,129),new Point(138.6869763453742,129),new Point(147,129),new Point(150,129),new Point(153,129),new Point(160,129),new Point(161.1169122069911,129),new Point(163,129),new Point(166,129),new Point(168,129),new Point(171,129),new Point(175,129),new Point(177,129),new Point(180,129),new Point(183.54684806860797,129),new Point(185,129),new Point(187,129),new Point(191,129),new Point(195,129),new Point(197,129),new Point(198,129),new Point(201,129),new Point(205.97678393022485,129),new Point(206,129),new Point(209,129),new Point(213,129),new Point(214,129),new Point(218,129),new Point(219,129),new Point(221,128),new Point(222,127),new Point(223,127),new Point(226,125),new Point(226.95759584755046,124.36160276829969),new Point(229,123),new Point(231,122),new Point(234,120),new Point(237,119),new Point(237,117),new Point(240,115),new Point(243,112),new Point(244,112),new Point(244.0871033132617,111.91289668673829),new Point(245,111),new Point(247,109),new Point(250,106),new Point(251,106),new Point(255,103),new Point(259,100),new Point(260,99),new Point(261.60425054519413,98.59893736370147),new Point(264,98),new Point(268,95),new Point(269,94),new Point(270,92),new Point(273,91),new Point(274,90),new Point(277,89),new Point(279,87),new Point(279.74297630061784,87),new Point(280,87),new Point(288,84),new Point(290,83),new Point(291,82),new Point(295,81),new Point(298,80),new Point(299,79),new Point(300,79),new Point(300.2495720449404,78.87521397752981),new Point(302,78),new Point(303,78),new Point(305,78),new Point(306,78),new Point(308,78),new Point(309,78),new Point(312,78),new Point(315,79),new Point(319,80),new Point(320,81),new Point(321,81),new Point(321.34583074961245,81.69166149922489),new Point(323,85),new Point(326,87),new Point(328,91),new Point(330,95),new Point(331,96),new Point(333.8602385341745,99.81365137889937),new Point(334,100),new Point(337,104),new Point(338,108),new Point(339,111),new Point(342,117),new Point(342,119),new Point(342.29187049186385,120.16748196745544),new Point(343,123),new Point(343,127),new Point(343,128),new Point(343,131),new Point(342,137),new Point(341,139),new Point(339.2297228072308,141.65541578915378),new Point(339,142),new Point(337,145),new Point(334,151),new Point(331,155),new Point(330,157),new Point(329,158),new Point(328.0349486157041,160.89515415288773),new Point(327,164),new Point(325,167),new Point(323,171),new Point(322,172),new Point(318,176),new Point(315.1656431255698,178.8343568744302),new Point(315,179),new Point(310,183),new Point(308,183),new Point(307,184),new Point(301,186),new Point(299,186),new Point(296,186),new Point(294.9462120132205,186),new Point(293,186),new Point(288,186),new Point(283,186),new Point(279,185),new Point(277,184),new Point(275,182),new Point(273.8254750808152,181.45188837104706),new Point(260,175),new Point(257,174),new Point(257,172),new Point(256,171),new Point(255.5781242534825,170.5781242534825),new Point(254,169),new Point(253,167),new Point(251,164),new Point(251,161),new Point(251,160),new Point(251,159),new Point(249,152),new Point(249,151),new Point(249,149.9235980030123),new Point(249,149),new Point(249,148),new Point(249,147),new Point(249,146),new Point(253,144),new Point(262,142),new Point(266.74914885037543,141.2084751916041),new Point(268,141),new Point(270,141),new Point(274,140),new Point(282,138),new Point(288.6307641760589,136.5264968497647),new Point(291,136),new Point(295,135),new Point(297,134),new Point(300,133),new Point(305,132),new Point(306,131),new Point(309.8497398089389,130.03756504776527),new Point(310,130),new Point(315,129),new Point(320,129),new Point(327,128),new Point(329,127),new Point(331.86889589889125,127),new Point(333,127),new Point(337,127),new Point(339,127),new Point(341,126),new Point(343,125),new Point(344,125),new Point(345,124),new Point(348,122),new Point(350,121),new Point(351,120),new Point(352.0345386986775,119.48273065066122),new Point(353,119),new Point(354,119),new Point(356,117),new Point(358,116),new Point(362,116),new Point(365,116),new Point(373,115),new Point(373.2201551204928,114.95997179627405),new Point(384,113),new Point(385,112),new Point(386,112),new Point(387,112),new Point(389,109),new Point(390,109),new Point(391,108),new Point(392.22362922116736,106.36849437177688),new Point(394,104),new Point(402,97),new Point(404,96),new Point(404,95),new Point(405,95),new Point(407,95),new Point(407,94),new Point(408.3338632438018,93.11075783746547),new Point(410,92),new Point(412,92),new Point(413,92),new Point(416,92),new Point(427,91),new Point(430.382127675627,91),new Point(431,91),new Point(434,91),new Point(437,91),new Point(441,91),new Point(443,91),new Point(448,92),new Point(451,93),new Point(452.5507663634827,93),new Point(453,93),new Point(459,96),new Point(462,96),new Point(463,97),new Point(463,98),new Point(464,100),new Point(465,102),new Point(468.13063538521556,106.3828895393018),new Point(470,109),new Point(477,122),new Point(477,124),new Point(477.34633189423795,126.42432325966566),new Point(478,131),new Point(478,133),new Point(479,136),new Point(479,140),new Point(479,148),new Point(479,148.6455266991514),new Point(479,154),new Point(478,158),new Point(472,168),new Point(471.4228918089946,169.15421638201082),new Point(471,170),new Point(469,172),new Point(466,174),new Point(459,179),new Point(457,181),new Point(454,183),new Point(453.9887688303087,183.00842337726849),new Point(450,186),new Point(448,187),new Point(445,189),new Point(438,192),new Point(434.434292244227,193.7828538778865),new Point(434,194),new Point(433,195),new Point(432,195),new Point(428,197),new Point(422,197),new Point(420,197),new Point(416,197),new Point(413.264812264279,195.6324061321395),new Point(410,194),new Point(406,191),new Point(401,185),new Point(397.6887087985786,180.0330631978679),new Point(397,179),new Point(394,173),new Point(388,163),new Point(387,162),new Point(386.3720999774548,160.74419995490967),new Point(386,160),new Point(386,158),new Point(385,154),new Point(385,148),new Point(385,147),new Point(385,145),new Point(390.26875284727174,141.2366051090916),new Point(392,140),new Point(395,139),new Point(398,138),new Point(405,138),new Point(411.9778446662216,138),new Point(412,138),new Point(420,138),new Point(422,138),new Point(433,138),new Point(434.40778052783844,138),new Point(437,138),new Point(443,138),new Point(444,138),new Point(450,138),new Point(455,138),new Point(456.8377163894553,138),new Point(458,138),new Point(464,138),new Point(471,138),new Point(475,138),new Point(479.2501258844094,138.38637508040085),new Point(486,139),new Point(496,139),new Point(501,139),new Point(501.64105587173367,138.87980202404992),new Point(517,136),new Point(523.52689195654,134.08032589513527),new Point(534,131),new Point(536,131),new Point(541,130),new Point(543,130),new Point(543,129),new Point(544,128));
	
	var benz_o=new Array(new Point(7,222),new Point(9,222),new Point(12,222),new Point(15,222),new Point(18,222),new Point(22,222),new Point(26,222),new Point(27.421240272473558,222),new Point(29,222),new Point(32,222),new Point(35,222),new Point(37,222),new Point(39,222),new Point(41,222),new Point(43,222),new Point(45,222),new Point(47,222),new Point(48.842480544947115,222),new Point(49,222),new Point(52,222),new Point(56,222),new Point(60,222),new Point(64,222),new Point(66,222),new Point(68,222),new Point(70,222),new Point(70.26372081742068,222),new Point(72,222),new Point(75,222),new Point(78,222),new Point(81,222),new Point(84,222),new Point(87,222),new Point(89,222),new Point(91.68496108989423,222),new Point(92,222),new Point(95,222),new Point(97,222),new Point(100,222),new Point(103,222),new Point(106,222),new Point(107,222),new Point(109,222),new Point(111,222),new Point(113,222),new Point(113.10620136236778,222),new Point(114,222),new Point(116,222),new Point(117,222),new Point(120,222),new Point(123,222),new Point(125,222),new Point(128,222),new Point(130,222),new Point(133,222),new Point(134.52744163484135,222),new Point(135,222),new Point(138,222),new Point(140,222),new Point(141,222),new Point(143,222),new Point(145,222),new Point(147,222),new Point(149,222),new Point(151,222),new Point(153,222),new Point(155,222),new Point(155.94868190731492,222),new Point(157,222),new Point(159,222),new Point(161,222),new Point(163,222),new Point(165,222),new Point(167,222),new Point(169,222),new Point(171,222),new Point(174,223),new Point(176,223),new Point(176.85393362908616,223.85393362908616),new Point(177,224),new Point(179,224),new Point(182,224),new Point(184,224),new Point(186,224),new Point(187,224),new Point(189,224),new Point(190,224),new Point(192,224),new Point(193,224),new Point(196,224),new Point(197,224),new Point(198.21467122972058,224),new Point(200,224),new Point(201,224),new Point(203,224),new Point(205,224),new Point(206,224),new Point(208,224),new Point(210,224),new Point(212,224),new Point(213,224),new Point(215,224),new Point(217,224),new Point(219.63591150219415,224),new Point(220,224),new Point(221,224),new Point(224,224),new Point(227,224),new Point(230,224),new Point(232,224),new Point(235,224),new Point(241,224),new Point(241.05715177466772,224),new Point(244,224),new Point(246,224),new Point(247,224),new Point(249,224),new Point(252,224),new Point(254,224),new Point(255,224),new Point(257,224),new Point(259,224),new Point(262,224),new Point(262.47839204714126,224),new Point(264,224),new Point(266,224),new Point(268,224),new Point(273,223),new Point(275,222),new Point(276,222),new Point(278,222),new Point(281,222),new Point(283.56454482852223,222),new Point(284,222),new Point(286,221),new Point(288,221),new Point(290,220),new Point(294,219),new Point(295,218),new Point(297,218),new Point(301,218),new Point(303.88746418671684,217.27813395332078),new Point(305,217),new Point(308,217),new Point(311,216),new Point(316,216),new Point(324.935234431249,214.2129531137502),new Point(326,214),new Point(342,212),new Point(346,212),new Point(346.21087269338386,212),new Point(349,212),new Point(354,211),new Point(356,210),new Point(358,210),new Point(359,209),new Point(360,209),new Point(360,208),new Point(361,207),new Point(362,207),new Point(363,206),new Point(364.78370550315805,204.9807397124811),new Point(370,202),new Point(372,201),new Point(374,200),new Point(376,198),new Point(378,197),new Point(381,194),new Point(382.5502391722636,193.48325360924545),new Point(384,193),new Point(387,192),new Point(391,189),new Point(394,188),new Point(395,186),new Point(397,186),new Point(399,183),new Point(399,182.27311639353962),new Point(399,181),new Point(399,180),new Point(399,178),new Point(400,176),new Point(400,175),new Point(400,173),new Point(401,172),new Point(401,169),new Point(401,167),new Point(402,166),new Point(403,163),new Point(403.29135680529413,162.1259295841177),new Point(404,160),new Point(406,154),new Point(406,152),new Point(407,150),new Point(407,147),new Point(408,143),new Point(408,141.50341519462947),new Point(408,141),new Point(408,140),new Point(408,139),new Point(408,136),new Point(408,135),new Point(408,129),new Point(408,128),new Point(408,127),new Point(408,126),new Point(408,125),new Point(408,122),new Point(408,120.08217492215591),new Point(408,118),new Point(407,115),new Point(407,113),new Point(407,108),new Point(407,106),new Point(404.1729248270448,99.40349126310453),new Point(404,99),new Point(404,98),new Point(404,96),new Point(404,93),new Point(403,87),new Point(403,78.10050767353931),new Point(403,78),new Point(403,76),new Point(403,74),new Point(403,71),new Point(403,69),new Point(401,66),new Point(400,65),new Point(400,64),new Point(400,62),new Point(399,61),new Point(397.39871687951376,58.598075319270635),new Point(397,58),new Point(395,56),new Point(395,55),new Point(393,54),new Point(392,52),new Point(380.55211066216503,47.23004610923544),new Point(380,47),new Point(376,46),new Point(371,44),new Point(369,44),new Point(366,44),new Point(362,44),new Point(360,44),new Point(359.6851500442907,44),new Point(358,44),new Point(357,44),new Point(349,44),new Point(345,44),new Point(342,44),new Point(338.26390977181717,44),new Point(337,44),new Point(323,44),new Point(319,44),new Point(316.84266949934363,44),new Point(312,44),new Point(298,44),new Point(295.4214292268701,44),new Point(292,44),new Point(288,44),new Point(274.00018895439655,44),new Point(271,44),new Point(259,44),new Point(257,44),new Point(252.57894868192298,44),new Point(250,44),new Point(244,44),new Point(239,44),new Point(232,44),new Point(231.18285713049187,44.20428571737703),new Point(228,45),new Point(224,45),new Point(216,47),new Point(210.10578501382884,47),new Point(208,47),new Point(206,47),new Point(205,47),new Point(203,47),new Point(199,49),new Point(197,50),new Point(194,52),new Point(189.99829994931864,52),new Point(189,52),new Point(187,52),new Point(185,52),new Point(182,54),new Point(181,54),new Point(180,54),new Point(179,55),new Point(176,56),new Point(170,57),new Point(169.84186470514877,57),new Point(169,57),new Point(168,58),new Point(167,58),new Point(166,59),new Point(162,63),new Point(159,65),new Point(158,66),new Point(157,67),new Point(157,68),new Point(155.64066712014943,71.39833219962642),new Point(155,73),new Point(153,81),new Point(152,84),new Point(152,90),new Point(151.6239040509281,92.25657569443129),new Point(151,96),new Point(151,101),new Point(151,104),new Point(151,106),new Point(151,111),new Point(151,113.62618008898673),new Point(151,118),new Point(151,121),new Point(151,126),new Point(151,131),new Point(151,135.0474203614603),new Point(151,139),new Point(151,141),new Point(151,145),new Point(151,156.46866063393387),new Point(151,157),new Point(151,159),new Point(151,167),new Point(151,171),new Point(150,175),new Point(150,177),new Point(150,177.76679528078975),new Point(150,179),new Point(150,186),new Point(153,193),new Point(154,195),new Point(154,198),new Point(154,198.33619446989962),new Point(154,199),new Point(155,201),new Point(156,203),new Point(159,206),new Point(160,209),new Point(161,210),new Point(161,212),new Point(163,215),new Point(164,216),new Point(164.31565390953165,216.31565390953165),new Point(165,217),new Point(167,219),new Point(171,221),new Point(175,223),new Point(176,224),new Point(182,226),new Point(182.92366858962782,226.18473371792555),new Point(187,227),new Point(189,227),new Point(194,227),new Point(196,227),new Point(198,227),new Point(203.94272445171833,228.9809081505728),new Point(204,229),new Point(217,230),new Point(222,230),new Point(225.28906931042388,230.46986704434627),new Point(246.49501527175326,233.49928789596476),new Point(250,234),new Point(255,235),new Point(261,235),new Point(267.7816515170257,235),new Point(268,235),new Point(272,235),new Point(280,235),new Point(286,235),new Point(289.15122885699435,235.5729507012717),new Point(297,237),new Point(300,238),new Point(302,238),new Point(310,238),new Point(310.27958631000814,238.03289250705978),new Point(327,240),new Point(331.5231211923677,240.75385353206127),new Point(333,241),new Point(336,241),new Point(344,241),new Point(349,241),new Point(352.8477885305893,240.23044229388213),new Point(354,240),new Point(361,239),new Point(364,238),new Point(366,238),new Point(373.50267933959555,235.18649524765166),new Point(374,235),new Point(378,234),new Point(383,234),new Point(388,234),new Point(394.766995948716,234),new Point(397,234),new Point(402,234),new Point(407,234),new Point(415,233),new Point(416.04544476651785,232.58182209339284),new Point(420,231),new Point(434,230),new Point(436,230),new Point(437.1110594092746,229.81482343178757),new Point(442,229),new Point(449,227),new Point(454,225),new Point(457.6861419341426,224.07846451646435),new Point(458,224),new Point(465,223),new Point(468,222),new Point(470,221),new Point(471,221),new Point(475,220),new Point(477.9724067996414,218.14224575022413),new Point(483,215),new Point(485,214),new Point(488,214),new Point(491,213),new Point(494,211),new Point(497.2390521555995,209.70437913776018),new Point(499,209),new Point(503,208),new Point(504,208),new Point(513,206),new Point(517,206),new Point(518.1467000121909,205.71332499695228),new Point(521,205),new Point(528,204),new Point(534,203),new Point(535,203),new Point(537,202),new Point(538.869556441052,201.065221779474),new Point(539,201),new Point(540,200),new Point(542,200),new Point(543,200),new Point(547,198),new Point(550,197),new Point(553,196),new Point(554,195),new Point(555,194),new Point(557,193),new Point(558,193));
	
	var benz_v=new Array(new Point(23,70),new Point(24,70),new Point(25,70),new Point(28,70),new Point(32,70),new Point(35.10570873993326,70),new Point(36,70),new Point(40,70),new Point(44,70),new Point(48,70),new Point(48.211417479866526,70),new Point(53,70),new Point(56,70),new Point(59,70),new Point(61.31712621979979,70),new Point(62,70),new Point(66,70),new Point(69,70),new Point(72,70),new Point(74.42283495973305,70),new Point(75,70),new Point(78,70),new Point(80,70),new Point(82,70),new Point(85,70),new Point(87,70),new Point(87.52854369966632,70),new Point(89,70),new Point(90,70),new Point(92,70),new Point(96,70),new Point(98,70),new Point(100.63425243959958,70),new Point(101,70),new Point(104,70),new Point(107,70),new Point(110,70),new Point(113,70),new Point(113.73996117953284,70),new Point(115,70),new Point(118,70),new Point(120,70),new Point(123,70),new Point(126,70),new Point(126.8456699194661,70),new Point(128,70),new Point(130,70),new Point(132,70),new Point(134,70),new Point(136,70),new Point(138,70),new Point(139.95137865939935,70),new Point(140,70),new Point(142,70),new Point(145,70),new Point(147,70),new Point(149,70),new Point(151,70),new Point(153,70),new Point(153.0570873993326,70),new Point(155,70),new Point(157,70),new Point(159,70),new Point(160,70),new Point(162,70),new Point(164,70),new Point(166,70),new Point(166.16279613926585,70),new Point(169,70),new Point(171,70),new Point(173,70),new Point(175,70),new Point(177,70),new Point(178,70),new Point(179.2685048791991,70),new Point(180,70),new Point(181,70),new Point(182,70),new Point(183,70),new Point(184,70),new Point(185,70),new Point(187,70),new Point(188,70),new Point(189,70),new Point(191,70),new Point(192,70),new Point(192.37421361913235,70),new Point(193,70),new Point(195,70),new Point(197,70),new Point(199,70),new Point(200,70),new Point(201,70),new Point(203,70),new Point(204,70),new Point(205,70),new Point(205.4799223590656,70),new Point(206,70),new Point(206,70),new Point(207,70),new Point(208,70),new Point(210,70),new Point(211,70),new Point(213,70),new Point(214,69),new Point(215,69),new Point(216,69),new Point(217,69),new Point(218,69),new Point(218,68.82858246337423),new Point(218,68),new Point(219,68),new Point(220,67),new Point(220,66),new Point(221,66),new Point(222,66),new Point(223,66),new Point(224,65),new Point(224,64),new Point(225,63),new Point(225,62),new Point(226,62),new Point(226,61.96551441056026),new Point(226,61),new Point(226,60),new Point(226,59),new Point(226,58),new Point(226,57),new Point(226,56),new Point(226,55),new Point(226,54),new Point(226,53),new Point(226,52),new Point(226,51),new Point(226,50),new Point(226,49),new Point(226,48.859805670627),new Point(226,48),new Point(225,48),new Point(225,46),new Point(225,45),new Point(224,43),new Point(222,41),new Point(221,40),new Point(221,39),new Point(220.45751163395732,38.45751163395731),new Point(220,38),new Point(219,37),new Point(219,35),new Point(217,32),new Point(216,32),new Point(216,31),new Point(214,30),new Point(213.14945182332147,29.149451823321478),new Point(212,28),new Point(211,27),new Point(210,25),new Point(209,25),new Point(207,24),new Point(206,24),new Point(205,24),new Point(204,24),new Point(203,24),new Point(202.40621113527513,24),new Point(201,24),new Point(200,24),new Point(198,24),new Point(196,25),new Point(193,27),new Point(192,28),new Point(190.7087469577419,28.64562652112905),new Point(190,29),new Point(187,33),new Point(187,34),new Point(185,36),new Point(185,38),new Point(185,39.48487842700853),new Point(185,42),new Point(185,43),new Point(185,44),new Point(185,45),new Point(185,48),new Point(185,51),new Point(185,52.590587166941795),new Point(185,53),new Point(185,54),new Point(186,56),new Point(187,58),new Point(190,64),new Point(190,64.5159560193761),new Point(190,65),new Point(191,67),new Point(193,68),new Point(194,71),new Point(194,72),new Point(195,74),new Point(196,74),new Point(196.33593932483285,74.67187864966569),new Point(197,76),new Point(198,77),new Point(201,79),new Point(203,81),new Point(205,82),new Point(205,83),new Point(205.53656398899204,83),new Point(207,83),new Point(210,84),new Point(213,85),new Point(217.88775352714467,87.09475151163343),new Point(220,88),new Point(226,91),new Point(227,91),new Point(229.7722315612463,92.38611578062314),new Point(231,93),new Point(232,93),new Point(232,94),new Point(233,94),new Point(234,94),new Point(239,97),new Point(240.9020700002469,97),new Point(241,97),new Point(244,99),new Point(248,100),new Point(249,102),new Point(251,102),new Point(251,103),new Point(251.03044367749274,103.03044367749273),new Point(253,105),new Point(253,106),new Point(254,107),new Point(254,108),new Point(254,109),new Point(255,109),new Point(256,111),new Point(256.6475832004699,113.59033280187958),new Point(257,115),new Point(257,117),new Point(258,118),new Point(259,119),new Point(260,121),new Point(261,125),new Point(261.1127927260644,125.4511709042576),new Point(262,129),new Point(263,131),new Point(265,134),new Point(267,137),new Point(267,137.0004889092527),new Point(267,138),new Point(267,139),new Point(268,140),new Point(269,142),new Point(269,144),new Point(270,145),new Point(270.98025685343305,148.9210274137321),new Point(271,149),new Point(272,153),new Point(273,153),new Point(274,157),new Point(275,159),new Point(275,160.54202643252046),new Point(275,162),new Point(276,163),new Point(276,164),new Point(277,169),new Point(277,170),new Point(278.4017919526725,172.80358390534496),new Point(279,174),new Point(280,176),new Point(281,180),new Point(283,184),new Point(283.29623120547063,184.88869361641187),new Point(284,187),new Point(286,190),new Point(289.60923471053286,196.3161607434325),new Point(290,197),new Point(295,202),new Point(297,204),new Point(299,205),new Point(299.14253448657263,205.11402758925811),new Point(304,209),new Point(307,211),new Point(309,212),new Point(309.7378648334515,212.7378648334515),new Point(311,214),new Point(318,217),new Point(319,218),new Point(321.1732374393968,218.72441247979893),new Point(322,219),new Point(330,221),new Point(333.98801323014493,221),new Point(334,221),new Point(339,222),new Point(346.9947024564854,222),new Point(348,222),new Point(356,219),new Point(357,219),new Point(358,217),new Point(358.3039007083119,216.89869976389605),new Point(361,216),new Point(368,211),new Point(369.1748192285299,209.82518077147014),new Point(372,207),new Point(375,205),new Point(379,202),new Point(379,201.49525149869947),new Point(379,201),new Point(380,200),new Point(384,196),new Point(386,194),new Point(388.25565698349965,192.49622867766692),new Point(389,192),new Point(395,189),new Point(397,187),new Point(398,186),new Point(399,186),new Point(399.26027514947276,186),new Point(400,186),new Point(401,185),new Point(403,185),new Point(404,185),new Point(405,185),new Point(406,185),new Point(407,185),new Point(411.2993406278217,187.456766073041),new Point(414,189),new Point(416,192),new Point(419,194),new Point(419,196),new Point(419.50198060259106,196.60237672310927),new Point(424,202),new Point(425,203),new Point(425,204),new Point(427,207),new Point(427.018914529449,207.05674358834702),new Point(428,210),new Point(430,212),new Point(430,214),new Point(430,215),new Point(431.8670348982931,218.73406979658628),new Point(433,221),new Point(434,223),new Point(435,226),new Point(436,228),new Point(437,229),new Point(437,230),new Point(437,230.5236945788407),new Point(437,231),new Point(440,235),new Point(440,236),new Point(442,238),new Point(444,239),new Point(445,239),new Point(445.5052692692819,239.25263463464094),new Point(447,240),new Point(453,242),new Point(458.0787395815924,242.56430439795471),new Point(462,243),new Point(464,243),new Point(467,244),new Point(469,244),new Point(470.9980396002521,244),new Point(472,244),new Point(483,243),new Point(484.0413154403291,242.81066991994018),new Point(494,241),new Point(496.9326509574261,240.45012794548262),new Point(509.81388756796855,238.03489608100588),new Point(510,238),new Point(513,238),new Point(516,238),new Point(522.9163530591993,238),new Point(530,238),new Point(531,238),new Point(535,238),new Point(536,238),new Point(536.0220617991325,238),new Point(537,238),new Point(538,238),new Point(543,241),new Point(548.0930179727284,242.4551479922081),new Point(550,243),new Point(552,244),new Point(554,245),new Point(556,246),new Point(557,247),new Point(557,248),new Point(557,249),new Point(557,250));	
		
	//var benz_z=new Array(new Point(0,246),new Point(9,248),new Point(20,250),new Point(35,252),new Point(54,255),new Point(83,260),new Point(109,260),new Point(125,260),new Point(138,262),new Point(154,263),new Point(176,263),new Point(198,263),new Point(220,262),new Point(255,263),new Point(287,262),new Point(313,261),new Point(340,260),new Point(364,260),new Point(386,260),new Point(409,258),new Point(439,256),new Point(471,255),new Point(502,254),new Point(529,253),new Point(561,252),new Point(602,249),new Point(649,245),new Point(680,243),new Point(698,241),new Point(720,238),new Point(750,236),new Point(774,234),new Point(777,235),new Point(770,239),new Point(759,244),new Point(728,253),new Point(699,258),new Point(680,262),new Point(662,267),new Point(640,272),new Point(620,281),new Point(602,287),new Point(582,295),new Point(563,304),new Point(541,312),new Point(510,320),new Point(480,328),new Point(458,336),new Point(436,347),new Point(410,356),new Point(382,369),new Point(353,383),new Point(334,394),new Point(317,401),new Point(293,409),new Point(265,419),new Point(247,429),new Point(236,440),new Point(222,452),new Point(205,468),new Point(191,482),new Point(180,494),new Point(177,501),new Point(171,508),new Point(162,515),new Point(156,519),new Point(166,517),new Point(192,515),new Point(213,516),new Point(232,516),new Point(252,517),new Point(274,516),new Point(302,514),new Point(332,513),new Point(357,513),new Point(386,510),new Point(420,506),new Point(452,502),new Point(473,497),new Point(495,488),new Point(514,482),new Point(533,475),new Point(550,464),new Point(564,452),new Point(574,442),new Point(586,431),new Point(594,417),new Point(601,406),new Point(610,396),new Point(619,384),new Point(625,373),new Point(627,373),new Point(622,382),new Point(622,392),new Point(619,403),new Point(616,414),new Point(613,427),new Point(609,442),new Point(605,457),new Point(598,469),new Point(590,481),new Point(597,480),new Point(614,480),new Point(638,480),new Point(656,478),new Point(668,476),new Point(684,471),new Point(704,466),new Point(726,458),new Point(746,451),new Point(763,445),new Point(778,439),new Point(790,432),new Point(801,426),new Point(815,418),new Point(825,409),new Point(834,400),new Point(841,390),new Point(851,375),new Point(857,361),new Point(861,353),new Point(867,343),new Point(871,329),new Point(876,318),new Point(881,307),new Point(886,296),new Point(893,283),new Point(901,270),new Point(909,256),new Point(919,245),new Point(930,234),new Point(940,225),new Point(953,215),new Point(962,205),new Point(972,193),new Point(982,179),new Point(987,171),new Point(993,167),new Point(1001,162),new Point(1016,158),new Point(1034,153),new Point(1063,147),new Point(1085,143),new Point(1104,140),new Point(1119,140));
	var benz_z=new Array(new Point(23,70),new Point(25,69),new Point(27,69),new Point(29,68),new Point(32,68),new Point(35,68),new Point(39,68),new Point(42,68),new Point(43.703599178555585,68),new Point(45,68),new Point(48,68),new Point(51,68),new Point(54,68),new Point(58,68),new Point(61,68),new Point(64,68),new Point(67,68),new Point(67.11540228961054,68),new Point(70,68),new Point(74,68),new Point(78,67),new Point(82,66),new Point(85,66),new Point(88,65),new Point(90.00999094666689,64.3300030177777),new Point(91,64),new Point(94,64),new Point(99,63),new Point(102,63),new Point(106,62),new Point(111,61),new Point(112.98597608038574,60.503505979903565),new Point(115,60),new Point(118,60),new Point(121,59),new Point(124,59),new Point(127,59),new Point(131,58),new Point(135,58),new Point(136.05041148699638,58),new Point(138,58),new Point(141,58),new Point(145,58),new Point(148,58),new Point(153,57),new Point(157,56),new Point(159.12513545574137,55.291621514752876),new Point(160,55),new Point(163,55),new Point(165,55),new Point(168,54),new Point(171,54),new Point(175,54),new Point(178,54),new Point(181,54),new Point(182.3273372495591,54),new Point(184,54),new Point(187,54),new Point(191,54),new Point(194,54),new Point(197,54),new Point(200,54),new Point(204,54),new Point(205.73914036061404,54),new Point(206,54),new Point(208,54),new Point(211,54),new Point(214,54),new Point(218,54),new Point(221,54),new Point(223,54),new Point(226,54),new Point(229.05686417742157,53.23578395564461),new Point(230,53),new Point(234,52),new Point(239,51),new Point(242,51),new Point(245,50),new Point(248,50),new Point(250,50),new Point(252.05523815772747,50),new Point(253,50),new Point(255,49),new Point(258,49),new Point(261,48),new Point(263,47),new Point(265,47),new Point(268,46),new Point(271,46),new Point(274,45),new Point(274.5080723332777,45),new Point(277,45),new Point(277,45),new Point(280,44),new Point(283,44),new Point(285,43),new Point(288,43),new Point(290,43),new Point(294,42),new Point(296,41),new Point(297.16235620354706,41),new Point(298,41),new Point(300,40),new Point(303,40),new Point(306,40),new Point(308,40),new Point(310,40),new Point(312,40),new Point(314,39),new Point(317,37),new Point(319,37),new Point(319.35105877736413,36.648941222635884),new Point(320,36),new Point(323,35),new Point(324,34),new Point(325,34),new Point(328,34),new Point(329,33),new Point(330,32),new Point(332,32),new Point(333,31),new Point(334,31),new Point(335,31),new Point(335,30),new Point(337,29),new Point(338,29),new Point(339.2869570694077,28.35652146529615),new Point(340,28),new Point(341,28),new Point(343,27),new Point(344,27),new Point(346,26),new Point(350,24),new Point(351,24),new Point(353,23),new Point(356,22),new Point(357,22),new Point(359,20),new Point(360,19),new Point(360.0293386444283,19),new Point(361,19),new Point(361,20),new Point(360,20),new Point(360,21),new Point(357,24),new Point(353,27),new Point(351,29),new Point(348,31),new Point(345.338080493418,33.66191950658204),new Point(344,35),new Point(343,37),new Point(341,38),new Point(339,40),new Point(337,41),new Point(334,43),new Point(332,45),new Point(327.66706667987023,48.4663466561038),new Point(327,49),new Point(324,50),new Point(321,53),new Point(316,55),new Point(313,56),new Point(309,58),new Point(307.22519996528007,59.183200023146604),new Point(306,60),new Point(300,64),new Point(292,68),new Point(288,71),new Point(287.25630671762576,71.24789776079142),new Point(285,72),new Point(282,74),new Point(272,78),new Point(269,80),new Point(266.1046044990715,80.96513183364283),new Point(266,81),new Point(261,83),new Point(253,87),new Point(251,87),new Point(244.94651888881964,90.45913206353164),new Point(244,91),new Point(241,92),new Point(238,94),new Point(233,97),new Point(231,99),new Point(228,100),new Point(226,101),new Point(224.7551734317764,101.82988437881573),new Point(220,105),new Point(218,106),new Point(216,108),new Point(214,108),new Point(208,112),new Point(205.1533909914155,113.89773933905633),new Point(205,114),new Point(202,116),new Point(197,119),new Point(190,123),new Point(185,125),new Point(184.7570915976166,125.2429084023834),new Point(183,127),new Point(179,129),new Point(170,135),new Point(167,137),new Point(165.1820237068187,137.90898814659064),new Point(163,139),new Point(151,149),new Point(148,150),new Point(146.45182546056344,151.54817453943656),new Point(145,153),new Point(140,155),new Point(134,159),new Point(128,162),new Point(126.54750327770948,163.45249672229053),new Point(126,164),new Point(120,167),new Point(117,169),new Point(115,170),new Point(113,171),new Point(106.18288010293644,174.89549708403632),new Point(106,175),new Point(103,176),new Point(101,178),new Point(95,180),new Point(90,183),new Point(88,185),new Point(87,186),new Point(86.425604389277,186.574395610723),new Point(85,188),new Point(79,193),new Point(76,194),new Point(75,196),new Point(73,197),new Point(70,201),new Point(69.57468611524521,201.85062776950957),new Point(69,203),new Point(65,209),new Point(63,211),new Point(62,213),new Point(60,214),new Point(58,216),new Point(55.859334696267354,220.2813306074653),new Point(55,222),new Point(54,224),new Point(52,230),new Point(51,232),new Point(51,233),new Point(51,234),new Point(51,235),new Point(51,236),new Point(52,236),new Point(53,236),new Point(55,236),new Point(57.64127351568299,236.5282547031366),new Point(65,238),new Point(70,238),new Point(80.90734512331007,238),new Point(87,238),new Point(93,238),new Point(104,238),new Point(104.31914823436502,238),new Point(109,238),new Point(115,238),new Point(127,238),new Point(127.73095134541997,238),new Point(140,238),new Point(148,238),new Point(151.11116818288872,237.55554740244446),new Point(155,237),new Point(162,236),new Point(174.31657169126694,234.46042853859163),new Point(186,233),new Point(192,233),new Point(197.63745180995824,233),new Point(203,233),new Point(220.95008244011615,231.1105176378825),new Point(222,231),new Point(225,230),new Point(232,229),new Point(243.5866598328596,225.43487389758167),new Point(245,225),new Point(248,223),new Point(256,221),new Point(265.36026084824323,217.25589566070272),new Point(266,217),new Point(270,216),new Point(285,213),new Point(288.16333508856553,212.05099947343032),new Point(295,210),new Point(303,209),new Point(310,207),new Point(310.90392809757554,206.7740179756061),new Point(322,204),new Point(327,203),new Point(333.319319216545,200.29172033576643),new Point(334,200),new Point(342,195),new Point(344,194),new Point(348,192),new Point(351,188),new Point(352,187),new Point(352.08120828281784,186.91879171718213),new Point(354,185),new Point(356,182),new Point(357,180),new Point(359,178),new Point(364,171),new Point(366.0555101178965,168.25931984280464),new Point(367,167),new Point(374,154),new Point(375,153),new Point(376,150),new Point(377,148),new Point(377.0715019556663,147.74974315516803),new Point(379,141),new Point(380,137),new Point(381,129),new Point(381.69156092715764,124.85063443705424),new Point(382,123),new Point(383,120),new Point(384,117),new Point(384,109),new Point(385.18549526134456,101.88702843193273),new Point(386,97),new Point(386,94),new Point(387,89),new Point(387,86),new Point(387,82),new Point(387,78.64165530758157),new Point(387,78),new Point(387,77),new Point(387,73),new Point(387,72),new Point(387,70),new Point(387,69),new Point(388,67),new Point(388,68),new Point(388,69),new Point(388,71),new Point(386.44790059078326,78.37247219377946),new Point(384,90),new Point(382.47623225343847,101.42825809921143),new Point(382,105),new Point(382,109),new Point(380.18797026121933,124.704257736099),new Point(379,135),new Point(378,138),new Point(377,140),new Point(376,146),new Point(376,147.5666425451981),new Point(376,150),new Point(376,157),new Point(376,159),new Point(376,166),new Point(376,168),new Point(376,170.97844565625306),new Point(376,171),new Point(376,174),new Point(377,178),new Point(383,184),new Point(385,185),new Point(388,185),new Point(390.4697827522385,185.61744568805963),new Point(392,186),new Point(400,187),new Point(413.77223352709075,187),new Point(416,187),new Point(423,187),new Point(425,187),new Point(428,187),new Point(436.909824265557,184.77254393361076),new Point(440,184),new Point(447,182),new Point(449,180),new Point(454,179),new Point(458.7614095447213,177.4128634850929),new Point(460,177),new Point(471,174),new Point(476,171),new Point(480,170),new Point(480.75040236399207,170),new Point(481,170),new Point(485,168),new Point(499,160),new Point(500.8141206474822,158.18587935251784),new Point(506,153),new Point(508,152),new Point(514,147),new Point(519.6475111428108,144.88218332144598),new Point(522,144),new Point(525,142),new Point(526,140),new Point(531,137),new Point(531,136),new Point(534,135),new Point(535,134),new Point(536,133),new Point(538,132));
	
	
	
	
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
		var res={};
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
			b = +Infinity
			var d;
			if (useProtractor) // for Protractor
				d = OptimalCosineDistance(this.Unistrokes[i].Vector, vector);
			else // Golden Section Search (original $1)
				d = DistanceAtBestAngle(points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision);
			
			//console.log(b+";"+d)
			
			if (d < b) {
				b = d; // best (least) distance
				u = i; // unistroke
			}
			res[this.Unistrokes[i].Name]=useProtractor ? 1.0 / d : 1.0 - d / HalfDiagonal;
			//console.log(new Result(this.Unistrokes[u].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal))
			
		}
		//console.log(useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal)
		//console.log(new Result(this.Unistrokes[u].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal))
		console.log(res)
		return res//(u == -1) ? new Result("No match.", 0.0) : new Result(this.Unistrokes[u].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
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