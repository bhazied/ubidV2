<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationPostType;
use ContinuousNet\UbidElectricityBundle\Form\TranslationPostTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Post Type Controller
 * 
 * Manage TranslationPostTypes 
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
 * @see		TranslationPostTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationposttype")
 */
class TranslationPostTypeController extends BaseController
{
	/**
	 * Lists all TranslationPostType entities.
	 *
	 * @Route("/", name="translationposttype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationPostTypes = $em->getRepository('UbidElectricityBundle:TranslationPostType')->findAll();

		return $this->render('UbidElectricityBundle:TranslationPostType:index.html.twig', array(
			'translationPostTypes' => $translationPostTypes,
		));
	}

	/**
	 * Creates a new TranslationPostType entity.
	 *
	 * @Route("/new", name="translationposttype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationPostType = new TranslationPostType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationPostTypeType', $translationPostType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPostType);
			$em->flush();

			return $this->redirectToRoute('translationposttype_show', array('id' => $translationPostType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationPostType:new.html.twig', array(
			'translationPostType' => $translationPostType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationPostType entity.
	 *
	 * @Route("/{id}", name="translationposttype_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationPostType $translationPostType)
	{
		$deleteForm = $this->createDeleteForm($translationPostType);

		return $this->render('UbidElectricityBundle:TranslationPostType:show.html.twig', array(
			'translationPostType' => $translationPostType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationPostType entity.
	 *
	 * @Route("/{id}/edit", name="translationposttype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationPostType $translationPostType)
	{
		$deleteForm = $this->createDeleteForm($translationPostType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationPostTypeType', $translationPostType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPostType);
			$em->flush();

			return $this->redirectToRoute('translationposttype_edit', array('id' => $translationPostType->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationPostType:edit.html.twig', array(
			'translationPostType' => $translationPostType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationPostType entity.
	 *
	 * @Route("/{id}", name="translationposttype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationPostType $translationPostType)
	{
		$form = $this->createDeleteForm($translationPostType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationPostType);
			$em->flush();
		}

		return $this->redirectToRoute('translationposttype_index');
	}

	/**
	 * Creates a form to delete a TranslationPostType entity.
	 *
	 * @param TranslationPostType $translationPostType The TranslationPostType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationPostType $translationPostType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationposttype_delete', array('id' => $translationPostType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
