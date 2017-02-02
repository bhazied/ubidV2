<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationSupplierType;
use ContinuousNet\UbidElectricityBundle\Form\TranslationSupplierTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Supplier Type Controller
 * 
 * Manage TranslationSupplierTypes 
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
 * @see		TranslationSupplierTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationsuppliertype")
 */
class TranslationSupplierTypeController extends BaseController
{
	/**
	 * Lists all TranslationSupplierType entities.
	 *
	 * @Route("/", name="translationsuppliertype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationSupplierTypes = $em->getRepository('UbidElectricityBundle:TranslationSupplierType')->findAll();

		return $this->render('UbidElectricityBundle:TranslationSupplierType:index.html.twig', array(
			'translationSupplierTypes' => $translationSupplierTypes,
		));
	}

	/**
	 * Creates a new TranslationSupplierType entity.
	 *
	 * @Route("/new", name="translationsuppliertype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationSupplierType = new TranslationSupplierType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationSupplierTypeType', $translationSupplierType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationSupplierType);
			$em->flush();

			return $this->redirectToRoute('translationsuppliertype_show', array('id' => $translationSupplierType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationSupplierType:new.html.twig', array(
			'translationSupplierType' => $translationSupplierType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationSupplierType entity.
	 *
	 * @Route("/{id}", name="translationsuppliertype_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationSupplierType $translationSupplierType)
	{
		$deleteForm = $this->createDeleteForm($translationSupplierType);

		return $this->render('UbidElectricityBundle:TranslationSupplierType:show.html.twig', array(
			'translationSupplierType' => $translationSupplierType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationSupplierType entity.
	 *
	 * @Route("/{id}/edit", name="translationsuppliertype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationSupplierType $translationSupplierType)
	{
		$deleteForm = $this->createDeleteForm($translationSupplierType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationSupplierTypeType', $translationSupplierType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationSupplierType);
			$em->flush();

			return $this->redirectToRoute('translationsuppliertype_edit', array('id' => $translationSupplierType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationSupplierType:edit.html.twig', array(
			'translationSupplierType' => $translationSupplierType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationSupplierType entity.
	 *
	 * @Route("/{id}", name="translationsuppliertype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationSupplierType $translationSupplierType)
	{
		$form = $this->createDeleteForm($translationSupplierType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationSupplierType);
			$em->flush();
		}

		return $this->redirectToRoute('translationsuppliertype_index');
	}

	/**
	 * Creates a form to delete a TranslationSupplierType entity.
	 *
	 * @param TranslationSupplierType $translationSupplierType The TranslationSupplierType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationSupplierType $translationSupplierType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationsuppliertype_delete', array('id' => $translationSupplierType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
