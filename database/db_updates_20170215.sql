
ALTER TABLE `tenders_categories`
  ADD CONSTRAINT `tenders_categories_fk2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `tenders_categories_fk1` FOREIGN KEY (`tender_id`) REFERENCES `tender` (`id`);
  
CREATE TABLE IF NOT EXISTS `suppliers_categories` (
  `supplier_id` int(10) unsigned NOT NULL,
  `category_id` smallint(6) unsigned NOT NULL,
  PRIMARY KEY (`supplier_id`,`category_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `suppliers_categories`
  ADD CONSTRAINT `suppliers_categories_fk2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `suppliers_categories_fk1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

ALTER TABLE `category` ADD INDEX ( `parent_category_id` ) ;

ALTER TABLE `category` ADD CONSTRAINT `parent_category_id_fk` FOREIGN KEY ( `parent_category_id` ) REFERENCES `ubid_electricity`.`category` (
  `id`
) ON DELETE SET NULL ON UPDATE CASCADE ;


