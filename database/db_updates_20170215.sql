
CREATE TABLE IF NOT EXISTS `suppliers_categories` (
  `supplier_id` int(10) unsigned NOT NULL,
  `category_id` smallint(6) unsigned NOT NULL,
  PRIMARY KEY (`supplier_id`,`category_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

