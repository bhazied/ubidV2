
CREATE TABLE IF NOT EXISTS `suppliers_languages` (
  `supplier_id` int(10) unsigned NOT NULL,
  `language_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`supplier_id`,`language_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `suppliers_languages`
  ADD CONSTRAINT `suppliers_languages_fk1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  ADD CONSTRAINT `suppliers_languages_fk2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);


CREATE TABLE IF NOT EXISTS `buyers_languages` (
  `buyer_id` int(10) unsigned NOT NULL,
  `language_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`buyer_id`,`language_id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `buyers_languages`
  ADD CONSTRAINT `buyers_languages_fk1` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`),
  ADD CONSTRAINT `buyers_languages_fk2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

CREATE TABLE IF NOT EXISTS `tenders_languages` (
  `tender_id` int(10) unsigned NOT NULL,
  `language_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`tender_id`,`language_id`),
  KEY `tender_id` (`tender_id`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `tenders_languages`
  ADD CONSTRAINT `tenders_languages_fk1` FOREIGN KEY (`tender_id`) REFERENCES `tender` (`id`),
  ADD CONSTRAINT `tenders_languages_fk2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

CREATE TABLE IF NOT EXISTS `supplier_products_languages` (
  `supplier_product_id` int(10) unsigned NOT NULL,
  `language_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`supplier_product_id`,`language_id`),
  KEY `supplier_product_id` (`supplier_product_id`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `supplier_products_languages`
  ADD CONSTRAINT `supplier_products_languages_fk1` FOREIGN KEY (`supplier_product_id`) REFERENCES `supplier_product` (`id`),
  ADD CONSTRAINT `supplier_products_languages_fk2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);


ALTER TABLE `translation_category` DROP `slug` ;

ALTER TABLE `translation_category`  ADD `meta_title` TINYTEXT NULL AFTER `description`,  
ADD `meta_description` TINYTEXT NULL AFTER `meta_title`,  
ADD `meta_keywords` TINYTEXT NULL AFTER `meta_description`,  
ADD `tenders_description` TEXT NULL AFTER `meta_keywords`,  
ADD `tenders_meta_title` TINYTEXT NULL AFTER `tenders_description`,  
ADD `tenders_meta_description` TINYTEXT NULL AFTER `tenders_meta_title`,  
ADD `tenders_meta_keywords` TINYTEXT NULL AFTER `tenders_meta_description`,  
ADD `consultations_description` TEXT NULL AFTER `tenders_meta_keywords`,  
ADD `consultations_meta_title` TINYTEXT NULL AFTER `consultations_description`,  
ADD `consultations_meta_description` TINYTEXT NULL AFTER `consultations_meta_title`,  
ADD `consultations_meta_keywords` TINYTEXT NULL AFTER `consultations_meta_description`,  
ADD `buyers_description` TEXT NULL AFTER `consultations_meta_keywords`,  
ADD `buyers_meta_title` TINYTEXT NULL AFTER `buyers_description`,  
ADD `buyers_meta_description` TINYTEXT NULL AFTER `buyers_meta_title`,  
ADD `buyers_meta_keywords` TINYTEXT NULL AFTER `buyers_meta_description`,  
ADD `suppliers_description` TEXT NULL AFTER `buyers_meta_keywords`,  
ADD `suppliers_meta_title` TINYTEXT NULL AFTER `suppliers_description`,  
ADD `suppliers_meta_description` TINYTEXT NULL AFTER `suppliers_meta_title`,  
ADD `suppliers_meta_keywords` TINYTEXT NULL AFTER `suppliers_meta_description`;


ALTER TABLE `translation_post` DROP `slug` ;

ALTER TABLE `translation_post` CHANGE `name` `title` VARCHAR( 320 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ;

ALTER TABLE `translation_post` ADD `meta_title` TINYTEXT NULL AFTER `content` ,
ADD `meta_description` TINYTEXT NULL AFTER `meta_title` ,
ADD `meta_keywords` TINYTEXT NULL AFTER `meta_description` ;






