<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationCategory;
use ContinuousNet\UbidElectricityBundle\Form\TranslationCategoryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Category Controller
 * 
 * Manage TranslationCategories 
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
 * @see		TranslationCategoryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationcategory")
 */
class TranslationCategoryController extends BaseController
{
	/**
	 * Lists all TranslationCategory entities.
	 *
	 * @Route("/", name="translationcategory_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationCategories = $em->getRepository('UbidElectricityBundle:TranslationCategory')->findAll();

		return $this->render('UbidElectricityBundle:TranslationCategory:index.html.twig', array(
			'translationCategories' => $translationCategories,
		));
	}

	/**
	 * Creates a new TranslationCategory entity.
	 *
	 * @Route("/new", name="translationcategory_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationCategory = new TranslationCategory();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationCategoryType', $translationCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationCategory);
			$em->flush();

			return $this->redirectToRoute('translationcategory_show', array('id' => $translationCategory->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationCategory:new.html.twig', array(
			'translationCategory' => $translationCategory,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationCategory entity.
	 *
	 * @Route("/{id}", name="translationcategory_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationCategory $translationCategory)
	{
		$deleteForm = $this->createDeleteForm($translationCategory);

		return $this->render('UbidElectricityBundle:TranslationCategory:show.html.twig', array(
			'translationCategory' => $translationCategory,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationCategory entity.
	 *
	 * @Route("/{id}/edit", name="translationcategory_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationCategory $translationCategory)
	{
		$deleteForm = $this->createDeleteForm($translationCategory);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationCategoryType', $translationCategory);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationCategory);
			$em->flush();

			return $this->redirectToRoute('translationcategory_edit', array('id' => $translationCategory->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationCategory:edit.html.twig', array(
			'translationCategory' => $translationCategory,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationCategory entity.
	 *
	 * @Route("/{id}", name="translationcategory_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationCategory $translationCategory)
	{
		$form = $this->createDeleteForm($translationCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationCategory);
			$em->flush();
		}

		return $this->redirectToRoute('translationcategory_index');
	}

	/**
	 * Creates a form to delete a TranslationCategory entity.
	 *
	 * @param TranslationCategory $translationCategory The TranslationCategory entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationCategory $translationCategory)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationcategory_delete', array('id' => $translationCategory->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
