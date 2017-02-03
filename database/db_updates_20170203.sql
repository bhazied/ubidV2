ALTER TABLE `category` ADD `meta_title` TINYTEXT NULL AFTER `product_type_id` ,
ADD `meta_description` TINYTEXT NULL AFTER `meta_title` ,
ADD `meta_keywords` TINYTEXT NULL AFTER `meta_description` ;