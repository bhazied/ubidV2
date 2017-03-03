<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationIndicatorType;
use ContinuousNet\BiodyXpertBundle\Form\TranslationIndicatorTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Indicator Type Controller
 * 
 * Manage TranslationIndicatorTypes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		TranslationIndicatorTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationindicatortype")
 */
class TranslationIndicatorTypeController extends BaseController
{
	/**
	 * Lists all TranslationIndicatorType entities.
	 *
	 * @Route("/", name="translationindicatortype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationIndicatorTypes = $em->getRepository('BiodyXpertBundle:TranslationIndicatorType')->findAll();

		return $this->render('BiodyXpertBundle:TranslationIndicatorType:index.html.twig', array(
			'translationIndicatorTypes' => $translationIndicatorTypes,
		));
	}

	/**
	 * Creates a new TranslationIndicatorType entity.
	 *
	 * @Route("/new", name="translationindicatortype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationIndicatorType = new TranslationIndicatorType();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationIndicatorTypeType', $translationIndicatorType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationIndicatorType);
			$em->flush();

			return $this->redirectToRoute('translationindicatortype_show', array('id' => $translationIndicatorType->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationIndicatorType:new.html.twig', array(
			'translationIndicatorType' => $translationIndicatorType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationIndicatorType entity.
	 *
	 * @Route("/{id}", name="translationindicatortype_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationIndicatorType $translationIndicatorType)
	{
		$deleteForm = $this->createDeleteForm($translationIndicatorType);

		return $this->render('BiodyXpertBundle:TranslationIndicatorType:show.html.twig', array(
			'translationIndicatorType' => $translationIndicatorType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationIndicatorType entity.
	 *
	 * @Route("/{id}/edit", name="translationindicatortype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationIndicatorType $translationIndicatorType)
	{
		$deleteForm = $this->createDeleteForm($translationIndicatorType);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationIndicatorTypeType', $translationIndicatorType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationIndicatorType);
			$em->flush();

			return $this->redirectToRoute('translationindicatortype_edit', array('id' => $translationIndicatorType->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationIndicatorType:edit.html.twig', array(
			'translationIndicatorType' => $translationIndicatorType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationIndicatorType entity.
	 *
	 * @Route("/{id}", name="translationindicatortype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationIndicatorType $translationIndicatorType)
	{
		$form = $this->createDeleteForm($translationIndicatorType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationIndicatorType);
			$em->flush();
		}

		return $this->redirectToRoute('translationindicatortype_index');
	}

	/**
	 * Creates a form to delete a TranslationIndicatorType entity.
	 *
	 * @param TranslationIndicatorType $translationIndicatorType The TranslationIndicatorType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationIndicatorType $translationIndicatorType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationindicatortype_delete', array('id' => $translationIndicatorType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
