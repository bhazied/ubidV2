CREATE TABLE IF NOT EXISTS `buyers_categories` (
  `buyer_id` int(10) unsigned NOT NULL,
  `category_id` smallint(6) unsigned NOT NULL,
  PRIMARY KEY (`buyer_id`,`category_id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `buyers_categories`
  ADD CONSTRAINT `buyers_categories_fk2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `buyers_categories_fk1` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`);
