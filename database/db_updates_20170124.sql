
ALTER TABLE `buyer` CHANGE `total_revenu` `total_revenu` VARCHAR( 100 ) NULL DEFAULT NULL COMMENT '{"fs":"d","pos":2}';

ALTER TABLE `supplier` CHANGE `total_revenu` `total_revenu` VARCHAR( 100 ) NULL DEFAULT NULL COMMENT '{"fs":"d","pos":2}';

ALTER TABLE `tender` CHANGE `section` `section` ENUM( 'Consultation', 'Tender' ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '{"fs":"a","pos":0}';

ALTER TABLE `tender` CHANGE `slug` `slug` VARCHAR( 320 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '{"fs":"b","pos":2, "hide": true}';

ALTER TABLE `alert` CHANGE `type` `types` TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '{"array":true,"options":["Tender","Supplier","Buyer","SupplierProduct"]}';

ALTER TABLE `alert` DROP `unit_cost`;

ALTER TABLE `alert` DROP FOREIGN KEY `alert_fk1` ;
ALTER TABLE `alert` DROP `category_id`;

CREATE TABLE IF NOT EXISTS `alerts_categories` (
  `alert_id` int(10) unsigned NOT NULL,
  `category_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`alert_id`,`category_id`),
  KEY `alert_id` (`alert_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `alerts_categories`
  ADD CONSTRAINT `alert_category_id_fk2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `alert_category_id_fk1` FOREIGN KEY (`alert_id`) REFERENCES `alert` (`id`);

CREATE TABLE IF NOT EXISTS `alerts_countries` (
  `alert_id` int(10) unsigned NOT NULL,
  `country_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`alert_id`,`country_id`),
  KEY `alert_id` (`alert_id`),
  KEY `country_id` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `alerts_countries`
  ADD CONSTRAINT `alert_country_id_fk2` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `alert_country_id_fk1` FOREIGN KEY (`alert_id`) REFERENCES `alert` (`id`);

