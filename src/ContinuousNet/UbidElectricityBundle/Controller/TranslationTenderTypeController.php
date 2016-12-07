<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationTenderType;
use ContinuousNet\UbidElectricityBundle\Form\TranslationTenderTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Tender Type Controller
 * 
 * Manage TranslationTenderTypes 
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
 * @see		TranslationTenderTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationtendertype")
 */
class TranslationTenderTypeController extends BaseController
{
	/**
	 * Lists all TranslationTenderType entities.
	 *
	 * @Route("/", name="translationtendertype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationTenderTypes = $em->getRepository('UbidElectricityBundle:TranslationTenderType')->findAll();

		return $this->render('UbidElectricityBundle:TranslationTenderType:index.html.twig', array(
			'translationTenderTypes' => $translationTenderTypes,
		));
	}

	/**
	 * Creates a new TranslationTenderType entity.
	 *
	 * @Route("/new", name="translationtendertype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationTenderType = new TranslationTenderType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationTenderTypeType', $translationTenderType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationTenderType);
			$em->flush();

			return $this->redirectToRoute('translationtendertype_show', array('id' => $translationTenderType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationTenderType:new.html.twig', array(
			'translationTenderType' => $translationTenderType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationTenderType entity.
	 *
	 * @Route("/{id}", name="translationtendertype_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationTenderType $translationTenderType)
	{
		$deleteForm = $this->createDeleteForm($translationTenderType);

		return $this->render('UbidElectricityBundle:TranslationTenderType:show.html.twig', array(
			'translationTenderType' => $translationTenderType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationTenderType entity.
	 *
	 * @Route("/{id}/edit", name="translationtendertype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationTenderType $translationTenderType)
	{
		$deleteForm = $this->createDeleteForm($translationTenderType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationTenderTypeType', $translationTenderType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationTenderType);
			$em->flush();

			return $this->redirectToRoute('translationtendertype_edit', array('id' => $translationTenderType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationTenderType:edit.html.twig', array(
			'translationTenderType' => $translationTenderType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationTenderType entity.
	 *
	 * @Route("/{id}", name="translationtendertype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationTenderType $translationTenderType)
	{
		$form = $this->createDeleteForm($translationTenderType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationTenderType);
			$em->flush();
		}

		return $this->redirectToRoute('translationtendertype_index');
	}

	/**
	 * Creates a form to delete a TranslationTenderType entity.
	 *
	 * @param TranslationTenderType $translationTenderType The TranslationTenderType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationTenderType $translationTenderType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationtendertype_delete', array('id' => $translationTenderType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
