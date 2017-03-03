<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationFaqCategory;
use ContinuousNet\BiodyXpertBundle\Form\TranslationFaqCategoryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Faq Category Controller
 * 
 * Manage TranslationFaqCategories 
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
 * @see		TranslationFaqCategoryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationfaqcategory")
 */
class TranslationFaqCategoryController extends BaseController
{
	/**
	 * Lists all TranslationFaqCategory entities.
	 *
	 * @Route("/", name="translationfaqcategory_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationFaqCategories = $em->getRepository('BiodyXpertBundle:TranslationFaqCategory')->findAll();

		return $this->render('BiodyXpertBundle:TranslationFaqCategory:index.html.twig', array(
			'translationFaqCategories' => $translationFaqCategories,
		));
	}

	/**
	 * Creates a new TranslationFaqCategory entity.
	 *
	 * @Route("/new", name="translationfaqcategory_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationFaqCategory = new TranslationFaqCategory();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationFaqCategoryType', $translationFaqCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationFaqCategory);
			$em->flush();

			return $this->redirectToRoute('translationfaqcategory_show', array('id' => $translationFaqCategory->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationFaqCategory:new.html.twig', array(
			'translationFaqCategory' => $translationFaqCategory,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationFaqCategory entity.
	 *
	 * @Route("/{id}", name="translationfaqcategory_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationFaqCategory $translationFaqCategory)
	{
		$deleteForm = $this->createDeleteForm($translationFaqCategory);

		return $this->render('BiodyXpertBundle:TranslationFaqCategory:show.html.twig', array(
			'translationFaqCategory' => $translationFaqCategory,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationFaqCategory entity.
	 *
	 * @Route("/{id}/edit", name="translationfaqcategory_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationFaqCategory $translationFaqCategory)
	{
		$deleteForm = $this->createDeleteForm($translationFaqCategory);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationFaqCategoryType', $translationFaqCategory);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationFaqCategory);
			$em->flush();

			return $this->redirectToRoute('translationfaqcategory_edit', array('id' => $translationFaqCategory->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationFaqCategory:edit.html.twig', array(
			'translationFaqCategory' => $translationFaqCategory,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationFaqCategory entity.
	 *
	 * @Route("/{id}", name="translationfaqcategory_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationFaqCategory $translationFaqCategory)
	{
		$form = $this->createDeleteForm($translationFaqCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationFaqCategory);
			$em->flush();
		}

		return $this->redirectToRoute('translationfaqcategory_index');
	}

	/**
	 * Creates a form to delete a TranslationFaqCategory entity.
	 *
	 * @param TranslationFaqCategory $translationFaqCategory The TranslationFaqCategory entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationFaqCategory $translationFaqCategory)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationfaqcategory_delete', array('id' => $translationFaqCategory->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
