<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationProductType;
use ContinuousNet\UbidElectricityBundle\Form\TranslationProductTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Product Type Controller
 * 
 * Manage TranslationProductTypes 
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
 * @see		TranslationProductTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationproducttype")
 */
class TranslationProductTypeController extends BaseController
{
	/**
	 * Lists all TranslationProductType entities.
	 *
	 * @Route("/", name="translationproducttype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationProductTypes = $em->getRepository('UbidElectricityBundle:TranslationProductType')->findAll();

		return $this->render('UbidElectricityBundle:TranslationProductType:index.html.twig', array(
			'translationProductTypes' => $translationProductTypes,
		));
	}

	/**
	 * Creates a new TranslationProductType entity.
	 *
	 * @Route("/new", name="translationproducttype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationProductType = new TranslationProductType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationProductTypeType', $translationProductType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationProductType);
			$em->flush();

			return $this->redirectToRoute('translationproducttype_show', array('id' => $translationProductType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationProductType:new.html.twig', array(
			'translationProductType' => $translationProductType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationProductType entity.
	 *
	 * @Route("/{id}", name="translationproducttype_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationProductType $translationProductType)
	{
		$deleteForm = $this->createDeleteForm($translationProductType);

		return $this->render('UbidElectricityBundle:TranslationProductType:show.html.twig', array(
			'translationProductType' => $translationProductType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationProductType entity.
	 *
	 * @Route("/{id}/edit", name="translationproducttype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationProductType $translationProductType)
	{
		$deleteForm = $this->createDeleteForm($translationProductType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationProductTypeType', $translationProductType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationProductType);
			$em->flush();

			return $this->redirectToRoute('translationproducttype_edit', array('id' => $translationProductType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationProductType:edit.html.twig', array(
			'translationProductType' => $translationProductType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationProductType entity.
	 *
	 * @Route("/{id}", name="translationproducttype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationProductType $translationProductType)
	{
		$form = $this->createDeleteForm($translationProductType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationProductType);
			$em->flush();
		}

		return $this->redirectToRoute('translationproducttype_index');
	}

	/**
	 * Creates a form to delete a TranslationProductType entity.
	 *
	 * @param TranslationProductType $translationProductType The TranslationProductType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationProductType $translationProductType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationproducttype_delete', array('id' => $translationProductType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
