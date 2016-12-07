
ALTER TABLE `user` CHANGE `type` `type` ENUM( 'Guest', 'Buyer', 'Supplier', 'Both', 'Administrator' ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'Guest';

ALTER TABLE `tender` ADD `section` ENUM( 'Consultation', 'Tender' ) NOT NULL AFTER `id` ;

ALTER TABLE `buyer` ADD `is_public` TINYINT( 1 ) UNSIGNED NOT NULL AFTER `language_id` ,
ADD `enable_comment` TINYINT( 1 ) UNSIGNED NOT NULL AFTER `is_public` ,
ADD `enable_private_message` TINYINT( 1 ) UNSIGNED NOT NULL AFTER `enable_comment` ,
ADD `enable_share` TINYINT( 1 ) UNSIGNED NOT NULL AFTER `enable_private_message` ;

CREATE TABLE IF NOT EXISTS `supplier` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_type_id` smallint(5) unsigned DEFAULT NULL,
  `name` varchar(320) COLLATE utf8_unicode_ci NOT NULL COMMENT '{"unique":true}',
  `description` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reference_number` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '{"unique":true}',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '{"unique":true}',
  `first_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picture` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zip_code` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_name` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country_id` smallint(3) unsigned DEFAULT NULL,
  `language_id` smallint(5) unsigned DEFAULT NULL,
  `is_public` tinyint(1) unsigned NOT NULL,
  `enable_comment` tinyint(1) unsigned NOT NULL,
  `enable_private_message` tinyint(1) unsigned NOT NULL,
  `enable_share` tinyint(1) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `supplier_type_id` (`supplier_type_id`),
  KEY `country_id` (`country_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Marketplace","pstn":0,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `supplier_type` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '{"order":"asc","unique":true}',
  `name_ar` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name_fr` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug_ar` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug_fr` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Tenders","pstn":3,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `supplier`
  ADD CONSTRAINT `supplier_fk1` FOREIGN KEY (`supplier_type_id`) REFERENCES `supplier_type` (`id`),
  ADD CONSTRAINT `supplier_fk2` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `supplier_fk3` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `supplier_fk4` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `supplier_fk5` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

ALTER TABLE `supplier_type`
  ADD CONSTRAINT `supplier_type_fk1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `supplier_type_fk2` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

ALTER TABLE `bid` ADD `supplier_id` INT UNSIGNED NOT NULL AFTER `tender_id` ,
ADD INDEX ( `supplier_id` ) ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(320) NOT NULL COMMENT '{"order":"asc","unique":true}',
  `name_ar` varchar(320) DEFAULT NULL,
  `name_fr` varchar(320) DEFAULT NULL,
  `slug` varchar(320) NOT NULL,
  `slug_ar` varchar(320) DEFAULT NULL,
  `slug_fr` varchar(320) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `description` varchar(320) NOT NULL,
  `description_ar` varchar(320) DEFAULT NULL,
  `description_fr` varchar(320) DEFAULT NULL,
  `parent_id` smallint(5) unsigned DEFAULT NULL,
  `product_type_id` smallint(5) unsigned NOT NULL,
  `ordering` smallint(6) unsigned DEFAULT NULL,
  `status` enum('Draft','Online','Deactivated','Offline','Deleted','Archived') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Draft' COMMENT '{"only":["ROLE_ADMIN_PUBLISHER"]}',
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Tenders","pstn":3,"rls":["ADM"]}' AUTO_INCREMENT=1 ;

ALTER TABLE `category`
  ADD CONSTRAINT `category_fk1` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `category_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `category_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `tenders_categories` (
  `tender_id` int(10) unsigned NOT NULL,
  `category_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`tender_id`,`category_id`),
  KEY `tender_id` (`tender_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


ALTER TABLE `tenders_categories`
  ADD CONSTRAINT `tenders_categories_fk1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `tenders_categories_fk2` FOREIGN KEY (`tender_id`) REFERENCES `tender` (`id`);


DROP TABLE IF EXISTS `tenders_tender_categories`;

DROP TABLE IF EXISTS `tender_category`;

CREATE TABLE IF NOT EXISTS `supplier_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(10) unsigned NOT NULL,
  `category_id` smallint(6) unsigned NOT NULL,
  `name` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `brand` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `model` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picture` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('Draft','Online','Deactivated','Offline','Deleted','Archived') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Draft' COMMENT '{"only":["ROLE_ADMIN_PUBLISHER"]}',
  `unit_cost` float unsigned DEFAULT NULL,
  `is_public` tinyint(1) unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '{"order":"desc"}',
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `category_id` (`category_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Marketplace","pstn":8,"rls":["ADM"]}' AUTO_INCREMENT=1 ;

ALTER TABLE `supplier_product`
  ADD CONSTRAINT `supplier_product_fk1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  ADD CONSTRAINT `supplier_product_fk2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `supplier_product_fk3` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `supplier_product_fk4` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

DROP TABLE IF EXISTS `bid_product`;

CREATE TABLE IF NOT EXISTS `bid_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tender_product_id` int(10) unsigned NOT NULL,
  `bid_id` int(10) unsigned NOT NULL,
  `supplier_product_id` int(10) unsigned NOT NULL,
  `new_unit_cost` float unsigned DEFAULT NULL,
  `quantity` float unsigned DEFAULT NULL,
  `duration` float unsigned DEFAULT NULL,
  `ordering` int(11) unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '{"order":"desc"}',
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `tender_product_id` (`tender_product_id`),
  KEY `bid_id` (`bid_id`),
  KEY `supplier_product_id` (`supplier_product_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Marketplace","pstn":8,"rls":["ADM"]}' AUTO_INCREMENT=1 ;

ALTER TABLE `bid_product`
  ADD CONSTRAINT `bid_product_fk1` FOREIGN KEY (`tender_product_id`) REFERENCES `tender_product` (`id`),
  ADD CONSTRAINT `bid_product_fk2` FOREIGN KEY (`bid_id`) REFERENCES `bid` (`id`),
  ADD CONSTRAINT `bid_product_fk3` FOREIGN KEY (`supplier_product_id`) REFERENCES `supplier_product` (`id`),
  ADD CONSTRAINT `bid_product_fk4` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `bid_product_fk5` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

CREATE TABLE IF NOT EXISTS `alert` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('Tender','Supplier','SupplierProduct') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Tender',
  `category_id` smallint(6) unsigned NULL,
  `name` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('Active','Inactive') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Active',
  `unit_cost` float unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '{"order":"desc"}',
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Access","pstn":8,"rls":["ADM"]}' AUTO_INCREMENT=1 ;

ALTER TABLE `alert`
  ADD CONSTRAINT `alert_fk1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `alert_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `alert_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"from_"}',
  `from_buyer_id` int(10) unsigned NULL COMMENT '{"prefix":"from_"}',
  `from_supplier_id` int(10) unsigned NULL COMMENT '{"prefix":"from_"}',
  `to_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"to_"}',
  `to_buyer_id` int(10) unsigned NULL COMMENT '{"prefix":"to_"}',
  `to_supplier_id` int(10) unsigned NULL COMMENT '{"prefix":"to_"}',
  `subject` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `body` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('Draft','Sent') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Draft',
  `is_read` tinyint(1) unsigned DEFAULT NULL,
  `sending_time` datetime NOT NULL COMMENT '{"order":"desc"}',
  `reading_time` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `from_buyer_id` (`from_buyer_id`),
  KEY `from_supplier_id` (`from_supplier_id`),
  KEY `to_user_id` (`to_user_id`),
  KEY `to_buyer_id` (`to_buyer_id`),
  KEY `to_supplier_id` (`to_supplier_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Marketplace","pstn":9,"rls":["ADM"]}' AUTO_INCREMENT=1 ;

ALTER TABLE `message`
  ADD CONSTRAINT `message_fk1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`), 
  ADD CONSTRAINT `message_fk3` FOREIGN KEY (`from_supplier_id`) REFERENCES `supplier` (`id`),
  ADD CONSTRAINT `message_fk4` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `message_fk5` FOREIGN KEY (`to_buyer_id`) REFERENCES `buyer` (`id`),
  ADD CONSTRAINT `message_fk6` FOREIGN KEY (`to_supplier_id`) REFERENCES `supplier` (`id`),
  ADD CONSTRAINT `message_fk7` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `message_fk8` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

ALTER TABLE `bidding_type`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `buyer_type`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `category`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`,
  DROP `description_ar`,
  DROP `description_fr`;

ALTER TABLE `country`
  DROP `name_ar`,
  DROP `name_fr`;

ALTER TABLE `menu`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `menu_link`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `post`
  DROP `title_ar`,
  DROP `title_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`,
  DROP `content_ar`,
  DROP `content_fr`;

ALTER TABLE `post_category`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`,
  DROP `description_ar`,
  DROP `description_fr`;

ALTER TABLE `post_type`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `product_type`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `region`
  DROP `name_ar`,
  DROP `name_fr`;

ALTER TABLE `sector`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `supplier_type`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;

ALTER TABLE `tender_type`
  DROP `name_ar`,
  DROP `name_fr`,
  DROP `slug_ar`,
  DROP `slug_fr`;


CREATE TABLE IF NOT EXISTS `translation_bidding_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bidding_type_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bidding_type_id` (`bidding_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_bidding_type`
  ADD CONSTRAINT `translation_bidding_type_fk1` FOREIGN KEY (`bidding_type_id`) REFERENCES `bidding_type` (`id`),
  ADD CONSTRAINT `translation_bidding_type_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_bidding_type_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_buyer_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `buyer_type_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buyer_type_id` (`buyer_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_buyer_type`
  ADD CONSTRAINT `translation_buyer_type_fk1` FOREIGN KEY (`buyer_type_id`) REFERENCES `buyer_type` (`id`),
  ADD CONSTRAINT `translation_buyer_type_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_buyer_type_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(320) NOT NULL,
  `slug` varchar(320) NOT NULL,
  `description` varchar(320) DEFAULT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_category`
ADD CONSTRAINT `translation_category_fk1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
ADD CONSTRAINT `translation_category_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
ADD CONSTRAINT `translation_category_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_country` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(320) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `country_id` (`country_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_country`
ADD CONSTRAINT `translation_country_fk1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
ADD CONSTRAINT `translation_country_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
ADD CONSTRAINT `translation_country_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_id` (`menu_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_menu`
  ADD CONSTRAINT `translation_menu_fk1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`),
  ADD CONSTRAINT `translation_menu_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_menu_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_menu_link` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_link_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_link_id` (`menu_link_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_menu_link`
  ADD CONSTRAINT `translation_menu_link_fk1` FOREIGN KEY (`menu_link_id`) REFERENCES `menu_link` (`id`),
  ADD CONSTRAINT `translation_menu_link_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_menu_link_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(320) NOT NULL,
  `slug` varchar(320) NOT NULL,
  `content` text DEFAULT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_post`
  ADD CONSTRAINT `translation_post_fk1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `translation_post_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_post_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_post_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_category_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(320) NOT NULL,
  `slug` varchar(320) NOT NULL,
  `description` varchar(320) DEFAULT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_category_id` (`post_category_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_post_category`
ADD CONSTRAINT `translation_post_category_fk1` FOREIGN KEY (`post_category_id`) REFERENCES `post_category` (`id`),
ADD CONSTRAINT `translation_post_category_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
ADD CONSTRAINT `translation_post_category_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_post_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_type_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_type_id` (`post_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_post_type`
  ADD CONSTRAINT `translation_post_type_fk1` FOREIGN KEY (`post_type_id`) REFERENCES `post_type` (`id`),
  ADD CONSTRAINT `translation_post_type_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_post_type_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_product_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_type_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `translation_region` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `region_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(320) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `region_id` (`region_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_region`
ADD CONSTRAINT `translation_region_fk1` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`),
ADD CONSTRAINT `translation_region_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
ADD CONSTRAINT `translation_region_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_sector` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sector_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(320) NOT NULL,
  `slug` varchar(320) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sector_id` (`sector_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_sector`
ADD CONSTRAINT `translation_sector_fk1` FOREIGN KEY (`sector_id`) REFERENCES `sector` (`id`),
ADD CONSTRAINT `translation_sector_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
ADD CONSTRAINT `translation_sector_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_supplier_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_type_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_type_id` (`supplier_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_supplier_type`
  ADD CONSTRAINT `translation_supplier_type_fk1` FOREIGN KEY (`supplier_type_id`) REFERENCES `supplier_type` (`id`),
  ADD CONSTRAINT `translation_supplier_type_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_supplier_type_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


ALTER TABLE `translation_product_type`
  ADD CONSTRAINT `translation_product_type_fk1` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`id`),
  ADD CONSTRAINT `translation_product_type_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_product_type_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `translation_tender_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tender_type_id` smallint(5) unsigned NOT NULL,
  `locale` varchar(5) NOT NULL COMMENT '{"order":"asc"}',
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `created_at` datetime NOT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tender_type_id` (`tender_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{"grp":"Translation","pstn":1,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `translation_tender_type`
  ADD CONSTRAINT `translation_tender_type_fk1` FOREIGN KEY (`tender_type_id`) REFERENCES `tender_type` (`id`),
  ADD CONSTRAINT `translation_tender_type_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `translation_tender_type_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

