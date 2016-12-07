<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationCountry;
use ContinuousNet\UbidElectricityBundle\Form\TranslationCountryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Country Controller
 * 
 * Manage TranslationCountries 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TranslationCountryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationcountry")
 */
class TranslationCountryController extends BaseController
{
	/**
	 * Lists all TranslationCountry entities.
	 *
	 * @Route("/", name="translationcountry_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationCountries = $em->getRepository('UbidElectricityBundle:TranslationCountry')->findAll();

		return $this->render('UbidElectricityBundle:TranslationCountry:index.html.twig', array(
			'translationCountries' => $translationCountries,
		));
	}

	/**
	 * Creates a new TranslationCountry entity.
	 *
	 * @Route("/new", name="translationcountry_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationCountry = new TranslationCountry();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationCountryType', $translationCountry);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationCountry);
			$em->flush();

			return $this->redirectToRoute('translationcountry_show', array('id' => $translationCountry->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationCountry:new.html.twig', array(
			'translationCountry' => $translationCountry,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationCountry entity.
	 *
	 * @Route("/{id}", name="translationcountry_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationCountry $translationCountry)
	{
		$deleteForm = $this->createDeleteForm($translationCountry);

		return $this->render('UbidElectricityBundle:TranslationCountry:show.html.twig', array(
			'translationCountry' => $translationCountry,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationCountry entity.
	 *
	 * @Route("/{id}/edit", name="translationcountry_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationCountry $translationCountry)
	{
		$deleteForm = $this->createDeleteForm($translationCountry);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationCountryType', $translationCountry);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationCountry);
			$em->flush();

			return $this->redirectToRoute('translationcountry_edit', array('id' => $translationCountry->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationCountry:edit.html.twig', array(
			'translationCountry' => $translationCountry,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationCountry entity.
	 *
	 * @Route("/{id}", name="translationcountry_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationCountry $translationCountry)
	{
		$form = $this->createDeleteForm($translationCountry);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationCountry);
			$em->flush();
		}

		return $this->redirectToRoute('translationcountry_index');
	}

	/**
	 * Creates a form to delete a TranslationCountry entity.
	 *
	 * @param TranslationCountry $translationCountry The TranslationCountry entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationCountry $translationCountry)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationcountry_delete', array('id' => $translationCountry->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
