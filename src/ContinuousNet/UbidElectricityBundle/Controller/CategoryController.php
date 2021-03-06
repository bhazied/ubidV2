<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Category;
use ContinuousNet\UbidElectricityBundle\Form\CategoryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Category Controller
 * 
 * Manage Categories 
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
 * @see		CategoryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/category")
 */
class CategoryController extends BaseController
{
	/**
	 * Lists all Category entities.
	 *
	 * @Route("/", name="category_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$categories = $em->getRepository('UbidElectricityBundle:Category')->findAll();

		return $this->render('UbidElectricityBundle:Category:index.html.twig', array(
			'categories' => $categories,
		));
	}

	/**
	 * Creates a new Category entity.
	 *
	 * @Route("/new", name="category_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$category = new Category();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\CategoryType', $category);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($category);
			$em->flush();

			return $this->redirectToRoute('category_show', array('id' => $category->getId()));
		}

		return $this->render('UbidElectricityBundle:Category:new.html.twig', array(
			'category' => $category,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Category entity.
	 *
	 * @Route("/{id}", name="category_show")
	 * @Method("GET")
	 */
	public function showAction(Category $category)
	{
		$deleteForm = $this->createDeleteForm($category);

		return $this->render('UbidElectricityBundle:Category:show.html.twig', array(
			'category' => $category,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Category entity.
	 *
	 * @Route("/{id}/edit", name="category_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Category $category)
	{
		$deleteForm = $this->createDeleteForm($category);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\CategoryType', $category);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($category);
			$em->flush();

			return $this->redirectToRoute('category_edit', array('id' => $category->getId()));
		}

		return $this->render('UbidElectricityBundle:Category:edit.html.twig', array(
			'category' => $category,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Category entity.
	 *
	 * @Route("/{id}", name="category_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Category $category)
	{
		$form = $this->createDeleteForm($category);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($category);
			$em->flush();
		}

		return $this->redirectToRoute('category_index');
	}

	/**
	 * Creates a form to delete a Category entity.
	 *
	 * @param Category $category The Category entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Category $category)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('category_delete', array('id' => $category->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
