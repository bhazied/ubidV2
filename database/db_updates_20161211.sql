ALTER TABLE `buyer` ADD `fax` VARCHAR( 20 ) NULL AFTER `phone` ,
ADD `website` VARCHAR( 100 ) NULL AFTER `fax` ;
ALTER TABLE `buyer` CHANGE `email` `email` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL ;

ALTER TABLE `supplier` ADD `fax` VARCHAR( 20 ) NULL AFTER `phone` ,
ADD `website` VARCHAR( 100 ) NULL AFTER `fax` ;
ALTER TABLE `supplier` CHANGE `email` `email` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL ;

ALTER TABLE `tender` ADD `fees` FLOAT NULL AFTER `reference` ;

DELETE FROM `tender_type`;

INSERT INTO `tender_type` (`id`, `name`, `slug`, `is_published`, `created_at`, `creator_user_id`, `modified_at`, `modifier_user_id`) VALUES
(1, 'Prior Information Notice', 'prior-information-notice', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(2, 'Procurement Plan', 'procurement-plan', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(3, 'Request For Proposals', 'request-for-froposals', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(4, 'Request For Expressions of Interest', 'request-for-expressions-of-interest', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(5, 'Prequalification Notice', 'prequalification-notice', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(6, 'Contract Awards', 'contract-awards', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(7, 'Consultants and contractors', 'consultants-and-contractors', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(8, 'Goods and works', 'goods-and-works', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1),
(9, 'Future procurement', 'future-procurement', 1, '2016-12-13 00:00:00', 1, '2016-12-13 00:00:00', 1);

DELETE FROM `bidding_type`;

INSERT INTO `bidding_type` (`id`, `name`, `slug`, `is_published`, `created_at`, `creator_user_id`, `modified_at`, `modifier_user_id`) VALUES
(1, 'National or Domestic Competitive Bidding', 'national-or-domestic-competitive-bidding', '1', '2016-12-13 00:00:00', '1', '2016-12-13 00:00:00', '1'),
(2, 'International Competitive Bidding', 'international-competitive-bidding', '1', '2016-12-13 00:00:00', '1', '2016-12-13 00:00:00', '1');


