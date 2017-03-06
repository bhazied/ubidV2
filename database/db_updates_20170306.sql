ALTER TABLE  `category` CHANGE  `meta_title`  `meta_title` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
CHANGE  `meta_description`  `meta_description` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
CHANGE  `meta_keywords`  `meta_keywords` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ;

ALTER TABLE  `category` ADD  `tenders_meta_title` TEXT NULL AFTER  `meta_keywords` ,
ADD  `tenders_meta_description` TEXT NULL AFTER  `tenders_meta_title` ,
ADD  `tenders_meta_keywords` TEXT NULL AFTER  `tenders_meta_description` ,
ADD  `consultations_meta_title` TEXT NULL AFTER  `tenders_meta_keywords` ,
ADD  `consultations_meta_description` TEXT NULL AFTER  `consultations_meta_title` ,
ADD  `consultations_meta_keywords` TEXT NULL AFTER  `consultations_meta_description` ,
ADD  `buyers_meta_title` TEXT NULL AFTER  `consultations_meta_keywords` ,
ADD  `buyers_meta_description` TEXT NULL AFTER  `buyers_meta_title` ,
ADD  `buyers_meta_keywords` TEXT NULL AFTER  `buyers_meta_description` ,
ADD  `suppliers_meta_title` TEXT NULL AFTER  `buyers_meta_keywords` ,
ADD  `suppliers_meta_description` TEXT NULL AFTER  `suppliers_meta_title` ,
ADD  `suppliers_meta_keywords` TEXT NULL AFTER  `suppliers_meta_description` ;