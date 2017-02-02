ALTER TABLE `tender` ADD `supplier_id` INT UNSIGNED NULL AFTER `buyer_id` ,
ADD INDEX ( `supplier_id` ) ;

ALTER TABLE `tender` CHANGE `buyer_id` `buyer_id` INT( 10 ) UNSIGNED NULL ;
