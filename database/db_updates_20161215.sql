
ALTER TABLE `buyer` CHANGE `total revenu` `total_revenu` INT( 10 ) UNSIGNED NULL DEFAULT NULL ;

ALTER TABLE `buyer` CHANGE `first_market_rate` `first_market_rate` SMALLINT UNSIGNED NULL DEFAULT NULL ,
CHANGE `second_market_rate` `second_market_rate` SMALLINT UNSIGNED NULL DEFAULT NULL ,
CHANGE `third_market_rate` `third_market_rate` SMALLINT UNSIGNED NULL DEFAULT NULL ;

ALTER TABLE `supplier` CHANGE `total revenu` `total_revenu` INT( 10 ) UNSIGNED NULL DEFAULT NULL ;

ALTER TABLE `supplier` CHANGE `first_market_rate` `first_market_rate` SMALLINT UNSIGNED NULL DEFAULT NULL ,
CHANGE `second_market_rate` `second_market_rate` SMALLINT UNSIGNED NULL DEFAULT NULL ,
CHANGE `third_market_rate` `third_market_rate` SMALLINT UNSIGNED NULL DEFAULT NULL ;

ALTER TABLE `buyer` CHANGE `views` `views` INT(11) NULL COMMENT '{"hidden":true}';
ALTER TABLE `supplier` CHANGE `views` `views` INT(11) NULL COMMENT '{"hidden":true}';
ALTER TABLE `supplier_product` CHANGE `views` `views` INT(11) NULL COMMENT '{"hidden":true}';
ALTER TABLE `tender` CHANGE `views` `views` INT(11) NULL COMMENT '{"hidden":true}';

