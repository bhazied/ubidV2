<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationBiddingType;
use ContinuousNet\UbidElectricityBundle\Form\TranslationBiddingTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Bidding Type Controller
 * 
 * Manage TranslationBiddingTypes 
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
 * @see		TranslationBiddingTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationbiddingtype")
 */
class TranslationBiddingTypeController extends BaseController
{
	/**
	 * Lists all TranslationBiddingType entities.
	 *
	 * @Route("/", name="translationbiddingtype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationBiddingTypes = $em->getRepository('UbidElectricityBundle:TranslationBiddingType')->findAll();

		return $this->render('UbidElectricityBundle:TranslationBiddingType:index.html.twig', array(
			'translationBiddingTypes' => $translationBiddingTypes,
		));
	}

	/**
	 * Creates a new TranslationBiddingType entity.
	 *
	 * @Route("/new", name="translationbiddingtype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationBiddingType = new TranslationBiddingType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationBiddingTypeType', $translationBiddingType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationBiddingType);
			$em->flush();

			return $this->redirectToRoute('translationbiddingtype_show', array('id' => $translationBiddingType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationBiddingType:new.html.twig', array(
			'translationBiddingType' => $translationBiddingType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationBiddingType entity.
	 *
	 * @Route("/{id}", name="translationbiddingtype_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationBiddingType $translationBiddingType)
	{
		$deleteForm = $this->createDeleteForm($translationBiddingType);

		return $this->render('UbidElectricityBundle:TranslationBiddingType:show.html.twig', array(
			'translationBiddingType' => $translationBiddingType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationBiddingType entity.
	 *
	 * @Route("/{id}/edit", name="translationbiddingtype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationBiddingType $translationBiddingType)
	{
		$deleteForm = $this->createDeleteForm($translationBiddingType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationBiddingTypeType', $translationBiddingType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationBiddingType);
			$em->flush();

			return $this->redirectToRoute('translationbiddingtype_edit', array('id' => $translationBiddingType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationBiddingType:edit.html.twig', array(
			'translationBiddingType' => $translationBiddingType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationBiddingType entity.
	 *
	 * @Route("/{id}", name="translationbiddingtype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationBiddingType $translationBiddingType)
	{
		$form = $this->createDeleteForm($translationBiddingType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationBiddingType);
			$em->flush();
		}

		return $this->redirectToRoute('translationbiddingtype_index');
	}

	/**
	 * Creates a form to delete a TranslationBiddingType entity.
	 *
	 * @param TranslationBiddingType $translationBiddingType The TranslationBiddingType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationBiddingType $translationBiddingType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationbiddingtype_delete', array('id' => $translationBiddingType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
