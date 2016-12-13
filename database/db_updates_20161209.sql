
ALTER TABLE `tender_product` ADD `category_id` SMALLINT UNSIGNED NOT NULL AFTER `tender_id` ,
ADD INDEX ( `category_id` ) ;

ALTER TABLE `buyer` ADD `total revenu` INT UNSIGNED NULL AFTER `language_id` ,
ADD `first_market_region_id` SMALLINT UNSIGNED NULL COMMENT '{"prefix":"first_market_"}' AFTER `total revenu` ,
ADD `first_market_rate` TINYINT UNSIGNED NULL AFTER `first_market_region_id` ,
ADD `second_market_region_id` INT UNSIGNED NULL COMMENT '{"prefix":"second_market_"}' AFTER `first_market_rate` ,
ADD `second_market_rate` TINYINT UNSIGNED NULL AFTER `second_market_region_id` ,
ADD `third_market_region_id` INT UNSIGNED NULL COMMENT '{"prefix":"third_market_"}' AFTER `second_market_rate` ,
ADD `third_market_rate` TINYINT UNSIGNED NULL AFTER `third_market_region_id` ;

ALTER TABLE `buyer` ADD `main_products_services` VARCHAR( 512 ) NULL AFTER `description` ;

ALTER TABLE `supplier` ADD `total revenu` INT UNSIGNED NULL AFTER `language_id` ,
ADD `first_market_region_id` SMALLINT UNSIGNED NULL COMMENT '{"prefix":"first_market_"}' AFTER `total revenu` ,
ADD `first_market_rate` TINYINT UNSIGNED NULL AFTER `first_market_region_id` ,
ADD `second_market_region_id` INT UNSIGNED NULL COMMENT '{"prefix":"second_market_"}' AFTER `first_market_rate` ,
ADD `second_market_rate` TINYINT UNSIGNED NULL AFTER `second_market_region_id` ,
ADD `third_market_region_id` INT UNSIGNED NULL COMMENT '{"prefix":"third_market_"}' AFTER `second_market_rate` ,
ADD `third_market_rate` TINYINT UNSIGNED NULL AFTER `third_market_region_id` ;

ALTER TABLE `supplier` ADD `main_products_services` VARCHAR( 512 ) NULL AFTER `description` ;
