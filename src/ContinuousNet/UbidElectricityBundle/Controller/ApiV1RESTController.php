<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TenderBookmark;
use ContinuousNet\UbidElectricityBundle\Entity\TenderCategory;
use ContinuousNet\UbidElectricityBundle\Entity\Tender;
use ContinuousNet\UbidElectricityBundle\Entity\Category;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View AS FOSView;
use FOS\UserBundle\Model\UserManager;
use Proxies\__CG__\ContinuousNet\UbidElectricityBundle\Entity\Bid;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use ContinuousNet\UbidElectricityBundle\EventListener\UserSessionData;

/**
 * Public Api V1 REST Controller
 * 
 * Manage Api V1 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 REST Controller
 * @package  ContinuousNet\UbidElectricityBundle\Controller
 * @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license  CONTINUOUS NET REGULAR LICENSE
 * @version  Release: 1.0
 * @link    http://ubid-electricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see      ApiV1RESTController
 * @since      Class available since Release 1.0
 * @deprecated Nothing
 * @access    public
 */
class ApiV1RESTController extends FOSRestController
{

    const SESSION_EMAIL = 'fos_user_send_resetting_email/email';

    private $locales = array(
        'en' => 'en_US',
        'fr' => 'fr_FR',
        'es' => 'es_ES',
        'de' => 'de_DE',
        'it' => 'it_IT',
    );

    private function setTranslator($code) {
        $translator = new Translator($this->locales[$code]);
        $yamlLoader = new YamlFileLoader();
        $translator->addLoader('yaml', $yamlLoader);
        $translator->addResource('yaml', $this->container->getParameter('kernel.root_dir').'/Resources/translations/messages.'.$code.'.yaml', $this->locales[$code]);
        $this->container->register('translator', $translator);
        $this->get('session')->setLocale($this->locales[$code]);
    }

    public function translateEntity($entity, $level = 0)
    {
        if (is_null($entity)) {
            return array();
        }
        $ns = 'ContinuousNet\UbidElectricityBundle\Entity\\';
        $entityName = str_replace($ns, '', get_class($entity));
        $translationEntityName = 'Translation' . $entityName;
        $translationEntityFullName = $ns . $translationEntityName;
        if (class_exists($translationEntityFullName)) {
            $entityField = lcfirst($entityName);
            $request = $this->get('request');
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->select('t');
            $qb->from('UbidElectricityBundle:' . $translationEntityName, 't');
            $qb->andWhere('t.locale = :locale')->setParameter('locale', $request->getLocale());
            $qb->andWhere('t.validated = :validated')->setParameter('validated', true);
            $qb->andWhere('t.' . $entityField . ' = :' . $entityField)->setParameter($entityField, $entity->getId());
            $qb->setMaxResults(1);
            $translation = $qb->getQuery()->getOneOrNullResult();
            if (!is_null($translation)) {
                $notTranslatableFields = array('Id', 'Locale', 'Validated', 'CreatorUser', 'CreatedAt', 'ModifierUser', 'ModifiedAt', $entityName);
                $translatableFields = array();
                $methods = get_class_methods($translation);
                foreach ($methods as $method) {
                    if (substr($method, 0, 3) == 'get') {
                        $field = str_replace('get', '', $method);
                        if (!in_array($field, $notTranslatableFields)) {
                            array_push($translatableFields, $field);
                        }
                    }
                }
                foreach ($translatableFields as $field) {
                    $setMethod = 'set' . $field;
                    $getMethod = 'get' . $field;
                    $entity->$setMethod($translation->$getMethod());
                }
            }
        }
        if ($level < 1) {
            $methods = get_class_methods($entity);
            foreach ($methods as $method) {
                if (substr($method, 0, 3) == 'get') {
                    $field = str_replace('get', '', $method);
                    $setMethod = 'set' . $field;
                    $fieldValue = $entity->$method();
                    if (is_object($fieldValue)) {
                        if (substr(get_class($fieldValue), 0, strlen($ns)) == $ns) {
                            $entity->$setMethod($this->translateEntity($fieldValue, $level + 1));
                        }
                    }
                }
            }
        }
        return $entity;

    }

    public function translateEntities($entities)
    {
        foreach ($entities as $i => $entity) {
            $entities[$i] = $this->translateEntity($entity);
        }
        return $entities;
    }

    private function getConfig($path) {
        $config = $this->container->getParameter('ubid_electricity');
        $paths = explode('.', $path);
        foreach ($paths as $index) {
            $config = $config[$index];
        }
        return $config;
    }

    private function getLanguageByCode($code) {
        $em = $this->getDoctrine()->getManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Language', 'l_');
        $qb->select('l_');
        $qb->andWhere('l_.code = :code')->setParameter('code', $code);
        return $qb->getQuery()->getOneOrNullResult();
    }

    private function getGroupByName($name){
        $em = $this->getDoctrine()->getManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Group', 'g_');
        $qb->select('g_');
        $qb->where('g_.name= :name')->setParameter('name', $name);
        return $qb->getQuery()->getOneOrNullResult();
    }

    /**
     * @Post("/checkEmail")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function checkEmailAction(Request $request)
    {
        try {
            $email = $request->request->get('email');
            if (!is_null($email) && !empty($email)) {
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $data = array('status' => false, 'message' => null);
                    $em = $this->getDoctrine()->getManager();
                    $qb = $em->createQueryBuilder();
                    $qb->from('UbidElectricityBundle:User', 'u_');
                    $qb->andWhere('u_.email = :email')->setParameter('email', $email);
                    $qb->select('count(u_.id)');
                    $count = $qb->getQuery()->getSingleScalarResult();
                    if ($count == 0) {
                        $data['status'] = true;
                        $data['message'] = $this->get('translator')->trans('register.available_email_address');
                    } else {
                        $data['status'] = false;
                        $data['message'] = $this->get('translator')->trans('register.email_already_used');
                    }
                } else {
                    $data['status'] = false;
                    $data['message'] = $this->get('translator')->trans('register.invalid_email');
                }
            } else {
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('register.empty_email');
            }
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @Post("/checkPhone")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function checkPhoneAction(Request $request)
    {
        try {
            $phone = $request->request->get('phone');
            if (!is_null($phone) && !empty($phone)) {
                if (is_numeric($phone)) {
                    $data = array('status' => false, 'message' => null);
                    $em = $this->getDoctrine()->getManager();
                    $qb = $em->createQueryBuilder();
                    $qb->from('UbidElectricityBundle:User', 'u_');
                    $qb->andWhere('u_.phone = :phone')->setParameter('phone', $phone);
                    $qb->select('count(u_.id)');
                    $count = $qb->getQuery()->getSingleScalarResult();
                    if ($count == 0) {
                        $data['status'] = true;
                        $data['message'] = $this->get('translator')->trans('register.available_phone_number');
                    } else {
                        $data['status'] = false;
                        $data['message'] = $this->get('translator')->trans('register.phone_already_used');
                    }
                } else {
                    $data['status'] = false;
                    $data['message'] = $this->get('translator')->trans('register.invalid_phone');
                }
            } else {
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('register.empty_phone');
            }
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @Post("/countries")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function countriesAction(Request $request)
    {
        try {
            $locale = $request->request->get('locale');
            $select = array('c_.id', 'c_.name', 'c_.nameAr', 'c_.nameFr');
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Country', 'c_');
            $qb->select($select);
            if ($locale == 'ar') {
                $qb->addOrderBy('c_.nameAr', 'ASC');
            } else if ($locale == 'fr') {
                $qb->addOrderBy('c_.nameFr', 'ASC');
            } else {
                $qb->addOrderBy('c_.name', 'ASC');
            }
            $qb->andWhere('c_.published = :published')->setParameter('published', true);
            $results = $qb->getQuery()->getResult();
            return $results;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @Post("/register")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function registerAction(Request $request)
    {
        try {

            $data = array('status' => false, 'message' => null);

            $jsonData = json_decode($request->getContent(), true);
            $language = $this->getLanguageByCode($jsonData['locale']);
            $jsonData['language'] = $language->getId();
            unset($jsonData['locale']);
            unset($jsonData['countryChoise']);
            unset($jsonData['cg']);
            $group = $this->getGroupByName('Subscriber');
            $jsonData['groups'] = array($group->getId());

            $jsonData['username'] = $jsonData['email'];
            $chars = '!#$%&\'*+-/=?^`{|}~.@';
            for ($i=0;$i<count($chars);$i++) {
                $jsonData['username'] = str_replace($chars[$i], '_', $jsonData['username']);
            }

            $jsonData['roles'] = array('ROLE_API', 'ROLE_SUBSCRIBER');

            //$jsonData['credentials_expired']  = false;

            //$jsonData['enabled'] = true;

            //$jsonData['picture'] = '/assets/images/'.strtolower($jsonData['gender']).'.png';
           // return $jsonData;

            if (isset($jsonData['provider'])) {
                unset($jsonData['provider']);
            }

            if (isset($jsonData['providerId'])) {
                unset($jsonData['providerId']);
            }
            $request->request->set('app_user_registration', $jsonData);

            $form = $this->container->get('fos_user.registration.form');
            $formHandler = $this->container->get('fos_user.registration.form.handler');
            $confirmationEnabled = $this->container->getParameter('fos_user.registration.confirmation.enabled');

            try {
                $process = $formHandler->process($confirmationEnabled);
            } catch (\Exception $e) {
                if (json_decode($e->getMessage())) {
                    return json_decode($e->getMessage());
                } else {
                    return $e->getMessage();
                }
            }

            if ($process) {

                $user = $form->getData();

                if ($confirmationEnabled) {
                    $this->container->get('session')->set('fos_user_send_confirmation_email/email', $user->getEmail());
                    $data['status'] = true;
                    $data['message'] = $this->get('translator')->trans('register.confirmation_email_sent_check_email');
                } else {
                    $data['status'] = true;
                    $data['message'] = $this->get('translator')->trans('register.registration_completed');
                    $data = array_merge($data, $this->get('ubid_electricity.event.user_session_data')->sessionData($user));

                    $em = $this->getDoctrine()->getManager();

                    $em->flush();
                }
                return $data;
            } else {
                $data['message'] = $this->get('translator')->trans('register.failure_inscription');
                return $data;
            }

        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * @Post("/emailConfirm")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function emailConfirmAction(Request $request) {

        $data = array('status' => false, 'message' => null);

        try {

            $token = $request->request->get('token');

            if (!is_null($token) && !empty($token)) {

                $user = $this->container->get('fos_user.user_manager')->findUserByConfirmationToken($token);

                if (null === $user) {

                    $data['status'] = false;
                    $data['message'] = sprintf($this->get('translator')->trans('register.user_with_confirmation_token_does_not_exist'), $token);

                } else {

                    $user->setConfirmationToken(null);
                    $user->setEnabled(true);
                    $user->setLastLogin(new \DateTime());

                    $this->container->get('fos_user.user_manager')->updateUser($user);

                    $data['status'] = true;
                    $data['message'] = $this->get('translator')->trans('register.email_confirmed');

                    $data = array_merge($data, $this->get('ubid_electricity.event.user_session_data')->sessionData($user));
                }
            } else {
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('register.empty_token');
            }
            return $data;

        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get the truncated email displayed when requesting the resetting.
     *
     * The default implementation only keeps the part following @ in the address.
     *
     * @param \FOS\UserBundle\Model\UserInterface $user
     *
     * @return string
     */
    protected function getObfuscatedEmail($user)
    {
        $email = $user->getEmail();
        if (false !== $pos = strpos($email, '@')) {
            $email = '...' . substr($email, $pos);
        }

        return $email;
    }

    /**
     * @Post("/requestResetPassword")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function requestResetPasswordAction(Request $request) {

        $data = array('status' => false, 'message' => null);

        try {

            $email = $request->request->get('email');
            if (!is_null($email) && !empty($email)) {
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $data = array('status' => false, 'message' => null);
                    /** @var $user UserInterface */
                    $user = $this->container->get('fos_user.user_manager')->findUserByUsernameOrEmail($email);
                    if (!is_null($user)) {

                        if (!$user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.resetting.token_ttl'))) {

                            if (null === $user->getConfirmationToken()) {
                                /** @var $tokenGenerator \FOS\UserBundle\Util\TokenGeneratorInterface */
                                $tokenGenerator = $this->container->get('fos_user.util.token_generator');
                                $user->setConfirmationToken($tokenGenerator->generateToken());
                            }

                            $this->container->get('session')->set(static::SESSION_EMAIL, $this->getObfuscatedEmail($user));
                            $this->container->get('fos_user.mailer')->sendResettingEmailMessage($user);
                            $user->setPasswordRequestedAt(new \DateTime());
                            $this->container->get('fos_user.user_manager')->updateUser($user);

                            $data['status'] = true;
                            $data['message'] = $this->get('translator')->trans('reset.reset_password_requested');

                        } else {
                            $data['status'] = false;
                            $data['message'] = $this->get('translator')->trans('reset.password_already_requested');
                        }
                    } else {
                        $data['status'] = false;
                        $data['message'] = $this->get('translator')->trans('reset.no_user_with_this_email');
                    }
                } else {
                    $data['status'] = false;
                    $data['message'] = $this->get('translator')->trans('reset.invalid_email');
                }
            } else {
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('reset.empty_email');
            }
            return $data;

        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @Post("/reset")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function resetAction(Request $request) {

        $data = array('status' => false, 'message' => null);

        try {

            $token = $request->request->get('token');

            if (!is_null($token) && !empty($token)) {

                $user = $this->container->get('fos_user.user_manager')->findUserByConfirmationToken($token);

                if (null === $user) {

                    $data['status'] = false;
                    $data['message'] = sprintf($this->get('translator')->trans('reset.user_with_confirmation_token_does_not_exist'), $token);

                } else if (!$user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.resetting.token_ttl'))) {

                    $data['status'] = false;
                    $data['message'] = sprintf($this->get('translator')->trans('reset.confirmation_token_is_expired'), $token);

                } else {

                    $jsonData = json_decode($request->getContent(), true);
                    unset($jsonData['locale']);
                    unset($jsonData['token']);

                    $request->request->set('fos_user_resetting_form', $jsonData);

                    $form = $this->container->get('fos_user.resetting.form');
                    $formHandler = $this->container->get('fos_user.resetting.form.handler');
                    $process = $formHandler->process($user);

                    if ($process) {

                        $data['token'] = $this->get("lexik_jwt_authentication.jwt_manager")->create($user);
                        $data['user'] = array(
                            'email' => $user->getEmail(),
                            'username' => $user->getUsername(),
                            'name' => $user->getFirstName() . ' ' . $user->getLastName(),
                            'firstName' => $user->getFirstName(),
                            'lastName' => $user->getLastName(),
                            'job' => $user->getJob(),
                            'picture' => $user->getPicture(),
                            'roles' => $user->getRoles()
                        );
                        $data['status'] = true;
                        $data['message'] = $this->get('translator')->trans('reset.password_changed');

                    } else {
                        $data['status'] = false;
                        $data['message'] = $this->get('translator')->trans('reset.password_not_changed');
                    }

                }

            } else {
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('Empty token.');
            }
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @Post("/checkConfirmationToken")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function checkConfirmationTokenAction(Request $request) {

        $data = array('status' => false, 'message' => null);

        try {

            $token = $request->request->get('token');

            if (!is_null($token) && !empty($token)) {

                $user = $this->container->get('fos_user.user_manager')->findUserByConfirmationToken($token);

                if (null === $user) {

                    $data['status'] = false;
                    $data['message'] = sprintf($this->get('translator')->trans('register.user_with_confirmation_token_does_not_exist'), $token);

                } else if (!$user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.resetting.token_ttl'))) {

                    $data['status'] = false;
                    $data['message'] = sprintf($this->get('translator')->trans('register.confirmation_token_is_expired'), $token);

                } else {

                    $data['status'] = true;
                    $data['message'] = $this->get('translator')->trans('register.correct_token');

                }
            } else {
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('register.empty_token');
            }
            return $data;

        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @Put("/updateProfile")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function updateProfileAction(Request $request)
    {
        try {
            $data = array();
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository('UbidElectricityBundle:User')->find($this->getUser()->getId());
            $fields = array(
                'firstName', 'lastName', 'gender', 'country', 'language', 'phone'
            );
            foreach ($fields as $field) {
                $value =  !is_null($request->request->get($field))  ? $request->request->get($field) : null;
                $method = 'set'.ucfirst($field);
                if (!is_null($value) && !is_array($value)) {
                    if ($field == 'country' ) {
                        $value = $em->getRepository('UbidElectricityBundle:Country')->findOneById($value);
                    } else if ($field == 'language') {
                        $value = $em->getRepository('UbidElectricityBundle:Language')->findOneByCode($value);
                    } else if ($field == 'birthDate') {
                        $value = new \DateTime($value);
                    }

                }
                else{
                    $value = null;
                }
                if(method_exists($user, $method)){
                    $user->$method($value);
                }
            }
            try {
                $em->flush();
                $data['status'] = true;
                $data['message'] = $this->get('translator')->trans('profile.updated');
            } catch (\Exception $e) {
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('profile.notupdated');
            }
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @GET("/homeTenders/{section}/{page}/{pageCount}/{sortField}/{sortDirection}")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function homeTendersAction($section, $page, $pageCount, $sortField, $sortDirection){
        $data = [];
        $em = $this->getDoctrine()->getManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Tender', 't_');

        $qb->andwhere('t_.status = :status')
            ->setParameters(array('status' => 'Online'));
        $qb->andWhere('t_.section = :section') ->setParameter('section', $section);
        $toDay = new \DateTime();
        $qb->andWhere('t_.publishDate < :today')->setParameter('today', $toDay);
        $qb->select('t_');
        $qbList = clone $qb;
        $qb->select('count(t_.id)');
        $count = $qb->getQuery()->getSingleScalarResult();
        $data['inlineCount'] = $count;
        $qbList->select('t_');
        $qbList->setMaxResults($pageCount);
        $offset = ($page - 1) * $pageCount;
        $qbList->setFirstResult($offset);
        $qbList->addOrderBy('t_.'.$sortField, $sortDirection);
        $results  = $qbList->getQuery()->getResult();
        if ($results) {
            $data['results'] = $results;
        }
        return $data;
    }

    /**
     * @GET("/homeSectors")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function homeSectorsAction(Request $request){
        $data = [];
        $page = $request->query->get('page');
        $em = $this->getDoctrine()->getManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Sector', 's_');
            //->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Tender', 'tender', \Doctrine\ORM\Query\Expr\Join::WITH, 's_.tender= tender.id')

        $qbList = clone $qb;
        $qb->select('count(s_.id)');
        $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
        $qbList->select('s_')
            ->setMaxResults(10)
            ->setFirstResult((10*$page))
            ->groupBy('s_.id')
            ->orderBy('s_.id', 'ASC');
        $results = $qbList->getQuery()->getResult();
        
        if ($results) {
            $data['results'] = $results;
            $i=0;
            foreach ($results as $r ){
                //return $r->getId();
                $tenders = $this->getDoctrine()->getRepository('UbidElectricityBundle:Tender')->findBy(array('sector' => $r->getId()));
                //return $tenders;
                $data['tender_count'][$i] = count($tenders);
                $i++;
            }
        }
        return $data;
    }

    /**
     * @GET("/categoriesTenders")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function categoriesTendersAction(Request $request){
        $locale = $request->getLocale();
        $data = [];
        $em = $this->getDoctrine()->getManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Category', 'c_');
        $qb->andWhere('c_.status = :status')->setParameter('status', 'Online');
        $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Category', 'parentCategory', \Doctrine\ORM\Query\Expr\Join::WITH, 'c_.parentCategory = parentCategory.id');
        $qb->select('c_');
        $qb->orderBy('c_.ordering', 'ASC');
        $results = $qb->getQuery()->getResult();
        if ($results) {
            $data['results'] = $this->prepareCategoryTree($results);
        }
        return $data;
    }

    private function prepareCategoryTree($categories, $parentId = null) {
        $tree = array();
        foreach ($categories as $category) {
            if (
                (is_null($parentId) && is_null($category->getParentCategory()))
                ||
                (!is_null($parentId) && !is_null($category->getParentCategory()) && $category->getParentCategory()->getId() == $parentId)
            ) {
                $tree[] = array(
                    'node' => $category,
                    'children' => $this->prepareCategoryTree($categories, $category->getId())
                );
            }
        }
        return $tree;
    }

    /**
     * @GET("/homeTender/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     * @param $entity
     */
    public function homeTenderAction(Tender $entity) {
        return $entity;
    }

    /**
     * @GET("/publicCategory/{slug}")
     * @View(serializerEnableMaxDepthChecks=true)
     * @param $entity
     */
    public function publicCategoryAction(Category $entity) {

        $data = array();

        $data['category'] = $entity;

        $em = $this->getDoctrine()->getManager();

        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Tender', 't_');
        $qb->select('t_');
        $qb->andWhere(":tender_category MEMBER OF t_.categories")
            ->setParameter("tender_category", $entity->getId());
        $qb->andWhere('t_.status = :status')->setParameter('status', 'Online');
        $data['tenders'] = $qb->getQuery()->getResult();

        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Buyer', 'b_');
        $qb->select('b_');
        $qb->andWhere(":buyer_category MEMBER OF b_.categories")
            ->setParameter("buyer_category", $entity->getId());
        $qb->andWhere('b_.isPublic = :isPublic')->setParameter('isPublic', true);
        $data['buyers'] = $qb->getQuery()->getResult();

        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Supplier', 's_');
        $qb->select('s_');
        $qb->andWhere(":supplier_category MEMBER OF s_.categories")
            ->setParameter("supplier_category", $entity->getId());
        $qb->andWhere('s_.isPublic = :isPublic')->setParameter('isPublic', true);
        $data['suppliers'] = $qb->getQuery()->getResult();

        return $data;
    }

    /**
     * @POST("/contact")
     * @View(serializerEnableMaxDepthChecks=true)
     * @param Request $request
     */
    public function contactAction(Request $request) {
        $response = array();
        try
        {
            $subject = $request->request->get('subject');
            $email = $request->request->get('email');
            $firstName = $request->request->get('firstName');
            $lastName = $request->request->get('lastName');
            $message = $request->request->get('message');
            $message = \Swift_Message::newInstance()
                ->setSubject($subject)
                ->setTo($this->container->getParameter('email_contact'))
                ->setFrom($email)
                ->setBody(
                    $this->renderView('UbidElectricityBundle:Emails:contact.html.twig', array(
                        'subject' => $subject,
                        'lastName' => $lastName,
                        'firstName' => $firstName,
                        'email' => $email,
                        'message' => $message
                    )),
                    'text/html'
                );
            $sent = $this->get('mailer')->send($message);
            if($sent){
                $response =  array(
                    'status' => '0',
                    'message' => 'Message envoyé avec succée'
                );
            }
            else{
                $response =  array(
                    'status' => '1',
                    'message' => 'Message non envoyé'
                );
            }
            return $response;
        }
        catch(\Exception $e){
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @Get("/getProfile")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function getProfileAction() {
        try {
            $user = $this->getUser();

            $data = array(
                'id' => $user->getId(),
                'name' => $user->getFirstName() . ' ' . $user->getLastName(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'phone' => $user->getPhone(),
                'job' => $user->getJob(),
                'zipCode' => $user->getZipCode(),
                //'city' => $user->getCity(),
                'type' => $user->getType(),
                'gender' => $user->getGender(),
                'address' => $user->getAddress(),
                'country' => $user->getCountry(),
                'picture' => $user->getPicture(),
                'lastLogin' => $user->getLastLogin(),
                'inscriptionDate' => $user->getCreatedAt()
            );

            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @POST("/checkPassword")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function checkPasswordAction(Request $request){
        $data = [];
        $user = $this->getUser();
        $password = $request->request->get('currentPassword');
        $encoder_service = $this->get('security.encoder_factory');
        $encoder = $encoder_service->getEncoder($user);
        $encoded_pass = $encoder->encodePassword($password, $user->getSalt());
        //return $encoded_pass." ".$password . " ".$user->getSalt();
        if($encoded_pass == $user->getPassword()){
            $data = [
                'status' => true,
                'message' => 'OK'
            ];
        }
        else{
            $data = [
                'status' => false,
                'message' => 'NOT OK'
            ];
        }
        return $data;
    }

    /**
     * @Post("/changePassword")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function changePasswordAction(Request $request) {

        $data = array('status' => false, 'message' => null);
        try {
            $em = $this->getDoctrine()->getManager();
            $user = $this->getUser();
            $jsonData = json_decode($request->getContent(), true);
            $password =  $jsonData['newPassword'];
            //$user = $user->setPlainPassword($password);
            $encoder_service = $this->get('security.encoder_factory');
            $encoder = $encoder_service->getEncoder($user);
            $encoded_pass = $encoder->encodePassword($password, $user->getSalt());
            $user = $user->setPassword($encoded_pass);
            $user->eraseCredentials();
            $em->flush();
            $data['status'] = true;
            $data['message'] = $this->get('translator')->trans('Password changed');
            return $data;
        } catch (\Exception $e) {
            $data['status'] = false;
            $data['message'] = $this->get('translator')->trans('Password not changed.');
        }
    }

    private function getDefaultPackage() {
        $default_package_id = $this->getConfig('settings.default_package_id');
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('UbidElectricityBundle:Package')->find($default_package_id);
        return $package;
    }

    private function getCode($length) {
        $pool = array_merge(range(0,9), range('A', 'Z'));
        $code = '';
        for ($i=0; $i < $length; $i++) {
            $code .= $pool[mt_rand(0, count($pool) - 1)];
        }
        return $code;
    }

    /**
     * Get a Post entity By slug
     *
     * @Get("/getPostBySlug/{slug}")
     * @View(serializerEnableMaxDepthChecks=true)
     * @return Response
     *
     */
    public function getPostBySlugAction($slug)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Post', 'p_');
            $qb->select('p_');
            $qb->andWhere('p_.slug = :slug')->setParameter('slug', $slug);
            $qb->setMaxResults(1);
            $data = $qb->getQuery()->getOneOrNullResult();
            $data = $this->translateEntity($data);
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get public Buyers List
     *
     * @Get("/buyers/{page}/{pageCount}/{sortField}/{sortDirection}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function buyersAction($page, $pageCount, $sortField, $sortDirection)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $data = array();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Buyer', 'b_');
            $qb->select('count(b_.id)');
            $qb->andWhere('b_.isPublic = :isPublic')->setParameter('isPublic', true);
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Buyer', 'b_');
            $qb->select('b_');
            $qb->andWhere('b_.isPublic = :isPublic')->setParameter('isPublic', true);
            $qb->addOrderBy('b_.'.$sortField, $sortDirection);
            $qb->setMaxResults($pageCount);
            $offset = ($page - 1) * $pageCount;
            $qb->setFirstResult($offset);
            $data['results'] = $qb->getQuery()->getResult();

            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get public Buyer
     *
     * @Get("/buyerDetails/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function buyerDetailAction($id)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Buyer', 'b_');
            $qb->select('b_');
            $qb->andWhere('b_.id = :id')->setParameter('id', $id);
            $qb->andWhere('b_.isPublic = :isPublic')->setParameter('isPublic', true);
            $qb->setMaxResults(1);
            $data = $qb->getQuery()->getOneOrNullResult();
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get public Suppliers List
     *
     * @Get("/suppliers/{page}/{pageCount}/{sortField}/{sortDirection}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function suppliersAction($page, $pageCount, $sortField, $sortDirection)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $data = array();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Supplier', 's_');
            $qb->select('count(s_.id)');
            $qb->andWhere('s_.isPublic = :isPublic')->setParameter('isPublic', true);
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Supplier', 's_');
            $qb->select('s_');
            $qb->andWhere('s_.isPublic = :isPublic')->setParameter('isPublic', true);
            $qb->addOrderBy('s_.'.$sortField, $sortDirection);
            $qb->setMaxResults($pageCount);
            $offset = ($page - 1) * $pageCount;
            $qb->setFirstResult($offset);
            $data['results'] = $qb->getQuery()->getResult();

            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get a Supplier entity By id
     *
     * @Get("/supplierDetails/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function supplierDetailAction($id)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Supplier', 's_');
            $qb->select('s_');
            $qb->andWhere('s_.id = :id')->setParameter('id', $id);
            $qb->andWhere('s_.isPublic = :isPublic')->setParameter('isPublic', true);
            $qb->setMaxResults(1);
            $data = $qb->getQuery()->getOneOrNullResult();
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get public Supplier Products List
     *
     * @Get("/supplierProducts/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function supplierProductsAction($id)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $data = array();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:SupplierProduct', 'sp_');
            $qb->select('count(sp_.id)');
            $qb->andWhere('sp_.status = :status')->setParameter('status', 'Online');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:SupplierProduct', 'sp_');
            $qb->select('sp_');
            $qb->andWhere('sp_.supplier = :supplier')->setParameter('supplier', $id);
            $qb->andWhere('sp_.status = :status')->setParameter('status', 'Online');
            $data['results'] = $qb->getQuery()->getResult();

            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get a Supplier Product entity By id
     *
     * @Get("/supplierProduct/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function supplierProductDetailsAction($id)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:SupplierProduct', 'sp_');
            $qb->select('sp_');
            $qb->andWhere('sp_.id = :id')->setParameter('id', $id);
            $qb->andWhere('sp_.status = :status')->setParameter('status', 'Online');
            $qb->setMaxResults(1);
            $data = $qb->getQuery()->getOneOrNullResult();
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get public Tenders List
     *
     * @Get("/tenders/{page}/{pageCount}/{sortField}/{sortDirection}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function tendersAction($page, $pageCount, $sortField, $sortDirection)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $data = array();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Tender', 't_');
            $qb->select('count(t_.id)');
            $qb->andWhere('t_.status = :status')->setParameter('status', 'Online');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Tender', 't_');
            $qb->select('t_');
            $qb->andWhere('t_.status = :status')->setParameter('status', 'Online');
            $qb->addOrderBy('t_.'.$sortField, $sortDirection);
            $qb->setMaxResults($pageCount);
            $offset = ($page - 1) * $pageCount;
            $qb->setFirstResult($offset);
            $data['results'] = $qb->getQuery()->getResult();

            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get a Tender entity By id
     *
     * @Get("/tenderDetails/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function tenderDetailsAction($id)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Tender', 't_');
            $qb->select('t_');
            $qb->andWhere('t_.id = :id')->setParameter('id', $id);
            $qb->andWhere('t_.status = :status')->setParameter('status', 'Online');
            $qb->setMaxResults(1);
            $data = $qb->getQuery()->getOneOrNullResult();
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Get public Bids List
     *
     * @Get("/bidsbyproject/{projectId}/{page}/{pageCount}/{sortField}/{sortDirection}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function bidsbyprojectAction($projectId ,$page, $pageCount, $sortField, $sortDirection)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $data = array();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Bid', 'b_');
            $qb->select('count(b_.id)');
            $qb->andWhere('b_.status = :status')->setParameter('status', 'Online');
            $qb->andWhere('b_.tender = :projectId')->setParameter('projectId', $projectId);
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Bid', 'b_');
            $qb->select('b_');
            //$qb->andWhere('b_.status != :status')->setParameter('status', 'Online');
            $qb->andWhere('b_.tender = :projectId')->setParameter('projectId', $projectId);
            $qb->addOrderBy('b_.'.$sortField, $sortDirection);
            $qb->setMaxResults($pageCount);
            $offset = ($page - 1) * $pageCount;
            $qb->setFirstResult($offset);
            $data['results'] = $qb->getQuery()->getResult();

            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get a Bid entity By id
     *
     * @Get("/bookmarkBid/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function bookmarkBidAction($id)
    {
        $data['status'] = false;
        $data['message'] = '';
        try {
            $em = $this->getDoctrine()->getManager();
           $bid = $em->getRepository('UbidElectricityBundle:Bid')->find($id);
           if($bid){
               if($bid->getStatus() == 'shortlisted'){
                   $data['status'] = false;
                   $data['message'] = $this->get('translator')->trans('bidShortList.alreadyShortListed', array($bid->getTitle()));
                   return $data;
               }
               $bid->setStatus('shortlisted');
               $em->flush();
              /*
               $message = \Swift_Message::newInstance()
                   ->setSubject('Your Tender '. $bid->getTender()->getTitle().' ')
                   ->setFrom('contact@continuousnet.com')
                   ->setTo($bid->getCreatorUser()->getEmail())
                   ->setBody(
                       $this->renderView('UbidElectricityBundle:Emails:bidShortListes.html.twig', array('tender' => $bid->getTender(), 'bid' => $bid)),
                       'text/html'
                   );
               $this->get('mailer')->send($message);
              */
               $data['status'] = true;
               $data['message'] = $this->get('translator')->trans('bidShortList.shortListed', array($bid->getTitle()));
               return $data;
           }
            else{
                $data['status'] = false;
                $data['message'] = $this->get('translator')->trans('bidShortList.shortListedError', array($bid->getTitle()));
                return $data;
            }
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get a Bid entity By id
     *
     * @Get("/bidsShorListed")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function bidsShorListedAction(Request $request){
        $tender_ids = [];
        $data = ['inlineCount' => 0, 'results' => []];
        //get All tender ids by curren user

        $offset = $request->request->get('offset');
        $limit = $request->request->get('limit');
        $order_by = $request->request->get('order_by') ? $request->request->get('order_by') : array();
        $filters = !is_null($request->request->get('filters')) ? $request->request->get('filters') : array();
        $data = array(
            'inlineCount' => 0,
            'results' => array()
        );
        $em = $this->getDoctrine()->getManager();
        $qb = $em->createQueryBuilder();
        $qbBids = clone $qb;

        $qb->from("UbidElectricityBundle:Tender", "t_")
            ->select('t_.id')
            ->where('t_.creatorUser = :user')
            ->setParameter('user', $this->getUser()->getId());
        $tenders = $qb->getQuery()->getResult();
        $tender_ids = array_values($tenders);

        //get the bids for all tenders by currenrtt user

        $qbBids->from("UbidElectricityBundle:Bid", 'b_')
            ->where('b_.tender IN (:tenders)')
            ->setParameter('tenders', $tender_ids)
            ->andWhere('b_.status = :status')
            ->setParameter('status', 'shortlisted');
        $qbListBids = clone $qbBids;
        $qbBids->select('count(b_.id)');
        $data['inlineCount'] = $qbBids->getQuery()->getSingleScalarResult();

        $qbListBids->select('b_');
        $qbListBids->setMaxResults($limit);
        $qbListBids->setFirstResult($offset);
        $qbListBids->groupBy('b_.id');
        $results = $qbListBids->getQuery()->getResult();
        if($results){
            $data['results'] = $results;
        }
        return $data;
    }

    /**
     * Get Bookmark tender
     *
     * @Get("/bookmarkTender/{id}")
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function bookmarkTenderAction($id){
        $data = ['status' => false, 'message' => ''];
        try{
            $em = $this->getDoctrine()->getManager();
            $Bookmarked = $em->getRepository('UbidElectricityBundle:TenderBookmark')->findOneBy(array('tender' => $id));
            if($Bookmarked){
                $data = [
                    'status' => false,
                    'message' => $this->get('translator')->trans('tenderBookMark.allreadyBookmarked')
                ];
                return $data;
            }
            $tender = $em->getRepository('UbidElectricityBundle:Tender')->find($id);
            if($tender){
                $tb = new TenderBookmark();
                $tb->setStatus('Active')
                    ->setTender($tender)
                    ->setCreatorUser($this->getUser());
                $em->persist($tb);
                $em->flush();
                $data = [
                    'status' => true,
                    'message' => $this->get('translator')->trans('tenderBookMark.addBookMark')
                ];
                return $data;
            }
            else{
                $data = [
                    'status' => false,
                    'message' => $this->get('translator')->trans('tenderBookMark.errorBookMark')
                ];
                return $data;
            }
        }
        catch(\Exception $e){
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



}
