<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationBuyerType;
use ContinuousNet\UbidElectricityBundle\Form\TranslationBuyerTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Buyer Type Controller
 * 
 * Manage TranslationBuyerTypes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TranslationBuyerTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationbuyertype")
 */
class TranslationBuyerTypeController extends BaseController
{
	/**
	 * Lists all TranslationBuyerType entities.
	 *
	 * @Route("/", name="translationbuyertype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationBuyerTypes = $em->getRepository('UbidElectricityBundle:TranslationBuyerType')->findAll();

		return $this->render('UbidElectricityBundle:TranslationBuyerType:index.html.twig', array(
			'translationBuyerTypes' => $translationBuyerTypes,
		));
	}

	/**
	 * Creates a new TranslationBuyerType entity.
	 *
	 * @Route("/new", name="translationbuyertype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationBuyerType = new TranslationBuyerType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationBuyerTypeType', $translationBuyerType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationBuyerType);
			$em->flush();

			return $this->redirectToRoute('translationbuyertype_show', array('id' => $translationBuyerType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationBuyerType:new.html.twig', array(
			'translationBuyerType' => $translationBuyerType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationBuyerType entity.
	 *
	 * @Route("/{id}", name="translationbuyertype_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationBuyerType $translationBuyerType)
	{
		$deleteForm = $this->createDeleteForm($translationBuyerType);

		return $this->render('UbidElectricityBundle:TranslationBuyerType:show.html.twig', array(
			'translationBuyerType' => $translationBuyerType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationBuyerType entity.
	 *
	 * @Route("/{id}/edit", name="translationbuyertype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationBuyerType $translationBuyerType)
	{
		$deleteForm = $this->createDeleteForm($translationBuyerType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationBuyerTypeType', $translationBuyerType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationBuyerType);
			$em->flush();

			return $this->redirectToRoute('translationbuyertype_edit', array('id' => $translationBuyerType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationBuyerType:edit.html.twig', array(
			'translationBuyerType' => $translationBuyerType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationBuyerType entity.
	 *
	 * @Route("/{id}", name="translationbuyertype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationBuyerType $translationBuyerType)
	{
		$form = $this->createDeleteForm($translationBuyerType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationBuyerType);
			$em->flush();
		}

		return $this->redirectToRoute('translationbuyertype_index');
	}

	/**
	 * Creates a form to delete a TranslationBuyerType entity.
	 *
	 * @param TranslationBuyerType $translationBuyerType The TranslationBuyerType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationBuyerType $translationBuyerType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationbuyertype_delete', array('id' => $translationBuyerType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
