<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View AS FOSView;
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
        'fr' => 'fr_FR',
        'ar' => 'ar_DZ',
        'en' => 'en_US'
    );

    private function setTranslator($code) {
        $translator = new Translator($this->locales[$code]);
        $yamlLoader = new YamlFileLoader();
        $translator->addLoader('yaml', $yamlLoader);
        $translator->addResource('yaml', $this->container->getParameter('kernel.root_dir').'/Resources/translations/messages.'.$code.'.yaml', $this->locales[$code]);
        $this->container->register('translator', $translator);
        $this->get('session')->setLocale($this->locales[$code]);
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

            $group = $this->getGroupByName('Subscriber');
            $jsonData['groups'] = array($group->getId());

            $jsonData['username'] = $jsonData['email'];
            $chars = '!#$%&\'*+-/=?^`{|}~.@';
            for ($i=0;$i<count($chars);$i++) {
                $jsonData['username'] = str_replace($chars[$i], '_', $jsonData['username']);
            }

            $jsonData['type'] = 'Subscriber';

            $jsonData['roles'] = array('ROLE_API', 'ROLE_SUBSCRIBER');

            //$jsonData['credentials_expired']  = false;

            //$jsonData['enabled'] = true;

            //$jsonData['picture'] = '/assets/images/'.strtolower($jsonData['gender']).'.png';

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
            }
            else{
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
                $value = $request->request->get($field);
                if (!is_null($value)) {
                    $method = 'set'.ucfirst($field);
                    if ($field == 'country') {
                        $value = $em->getRepository('UbidElectricityBundle:Country')->findOneById($value);
                    } else if ($field == 'language') {
                        $value = $em->getRepository('UbidElectricityBundle:Language')->findOneByCode($value);
                    } else if ($field == 'birthDate') {
                        $value = new \DateTime($value);
                    }
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
    
}
